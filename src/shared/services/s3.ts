import path from "path";
import { readdirSync, readFileSync, rm, } from "fs"
import { getUploadFolderPath } from "../utils";

import s3 from "../../config/s3";


export const uploadFileToS3 = async (folderPath: string, filename: string) => {
    try {
        const filepath = path.join(folderPath, filename);
        const file = readFileSync(filepath);

        const params = {
            Bucket: process.env.AWS_S3_REELS_BUCKET_NAME ?? '',
            Key: filename,
            Body: file,
        };
        return await s3.upload(params).promise();
    } catch (error) {
        console.log('single file upload to s3 error', error)
    }
}

export const uploadLocalFolderToS3 = async (folderName?: string) => {
    try {
        const folderPath = `${getUploadFolderPath()}${folderName}`;
        const files = readdirSync(folderPath);

        const promises = files?.map((filename) => {
            return uploadFileToS3(folderPath, filename);
        });

        const response = await Promise.all(promises);
        rm(folderPath, { recursive: true, force: true }, () => console.log("Recently encoded all files and folder removed!"));
        return response;
    } catch (error) {
        console.error(error)
    }
}