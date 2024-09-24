import { existsSync } from "fs";
import ffmpeg from "fluent-ffmpeg";
import path from "path";

export const getEncodedVideo = async (filename: string) => {
    try {
        const uploadDir = `${process.cwd()}/uploads/`;
        const inputDir = `${uploadDir}${filename}`;
        const outputDir = `${uploadDir}${filename}.m3u8`;

        if (!existsSync(inputDir)) return { data: null, error: "Given file doesn'nt exist!" };


        ffmpeg(inputDir)
            .output(outputDir)
            .addOption('-hls_time', '10')
            .addOption('-hls_list_size', '0')
            .addOption('-hls_segment_filename', path.join(outputDir, 'segement_%03d.ts'))
            .videoCodec('libx264')
            .audioCodec('aac')
            .format('hls')
            .on('start', (cmd) => {
                console.log('Spawned FFmpeg with command: ' + cmd);
            })
            .on('progress', (progress) => {
                console.log('Processing: ' + progress.percent + '% done');
            })
            .on('end', () => {
                console.log('Encoding finished successfully');
            })
            .on('error', (err, stdout, stderr) => {
                console.error('Error during conversion: ' + err.message);
                console.error('FFmpeg stderr: ' + stderr);
            })
            .run();

    } catch (error) {
        console.error(error);
    }
}