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
                const outputDir = `${newFolderName}${filename}.mpd`;

                if (!existsSync(inputDir)) return reject({ data: null, error: "Given file doesn't exist!" });

                const videoCodec = 'libx264';
                const videoBitrates = ['1000k', '2000k', '4000k'];
                const scaleOptions = ['scale=1280:720', 'scale=640:320'];
                const x264Options = 'keyint=24:min-keyint=24:no-scenecut';

                ffmpeg()
                    .input(inputDir)
                    .videoFilters(scaleOptions)
                    .videoCodec(videoCodec)
                    .addOption('-x264opts', x264Options)
                    .outputOptions('-b:v', videoBitrates[0])
                    .format('dash')
                    .output(outputDir)
                    .on('end', () => {
                        console.log('DASH encoding complete.');
                        unlink(inputDir, () => console.log('Video file removed successfully!'));
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
}