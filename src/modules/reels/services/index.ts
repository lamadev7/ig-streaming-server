import { IUploadReelsPayload } from "../types";
import { encodeVideo, uploadFileToS3, uploadLocalFolderToS3 } from "../../../shared/services";
import { unlink } from "fs";
import { getUploadFolderPath } from "../../../shared/utils";


class UserService {
    reelsRepository: any;

    constructor({ reelsRepository }: any) {
        this.reelsRepository = reelsRepository;
    }

    async getReels() {
        try {
            const response = await this.reelsRepository.find();

            return { data: response, error: null };

        } catch (error: any) {
            console.error(error)
            return { data: null, error: error?.error };
        }
    }

    async upload(payload: IUploadReelsPayload) {
        try {
            const filename = payload?.filename;
            const response = await uploadFileToS3({ filename });
            const dbPayload = { url: response?.Location };
            const dbRes = await this.reelsRepository.insertOne(dbPayload);

            const inputDir = `${getUploadFolderPath()}${filename}`;
            unlink(inputDir, () => console.log('Original video file removed successfully!'));

            return { data: dbRes, error: null };
        } catch (error: any) {
            console.error(error)
            return { data: null, error: error?.error };
        }
    }
}


export default UserService;