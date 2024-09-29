import ffmpeg from "fluent-ffmpeg";
import { existsSync, mkdir, unlink } from "fs";
import { getUploadFolderPath } from "../utils";

export const encodeVideo = (filename: string) => {
    try {
        return new Promise((resolve, reject) => {
            if (!filename) return reject({ data: null, error: { message: "Filename is required!" } });

            const uploadDir = getUploadFolderPath();
            const filenameWithoutExtension = filename?.split(".")?.[0];
            const newFolderName = `${uploadDir}${filenameWithoutExtension}/`;

            mkdir(newFolderName, { recursive: true }, (err) => {
                if (err) return reject({ data: null, error: err?.message || err });

                const inputDir = `${uploadDir}${filename}`;
                const outputDir = `${newFolderName}index.m3u8`;  // The HLS output playlist (.m3u8)

                if (!existsSync(inputDir)) return reject({ data: null, error: "Given file doesn't exist!" });

                const videoCodec = 'libx264';
                const videoBitrates = ['1000k', '2000k', '4000k']; // Optional bitrates if needed
                const scaleOptions = ['scale=1280:720', 'scale=640:320'];

                ffmpeg()
                    .input(inputDir)
                    .videoFilters(scaleOptions)
                    .videoCodec(videoCodec)
                    .addOption('-crf', '20') // Adjust quality, optional
                    .addOption('-preset', 'fast') // Preset option
                    .outputOptions([
                        '-hls_time 10',           // Segment length in seconds
                        '-hls_list_size 0',       // 0 = no limit to the number of playlist entries
                        '-hls_segment_filename',  // Segment filename pattern
                        `${newFolderName}segment_%03d.ts`,
                    ])
                    .format('hls')              // Output format as HLS
                    .output(outputDir)
                    .on('end', () => {
                        console.log('HLS encoding complete.');
                        unlink(inputDir, () => console.log('Original video file removed successfully!'));
                        resolve({ data: { folderName: filenameWithoutExtension }, error: null });
                    })
                    .on('error', (err_1) => {
                        reject({ data: null, error: err_1 });
                        console.error('Error:', err_1.message);
                    })
                    .run();
            });
        });
    } catch (err) {
        console.error({ err });
    }
};
