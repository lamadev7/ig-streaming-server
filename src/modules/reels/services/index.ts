import { IUploadReelsPayload } from "../types";
import { encodeVideo, uploadLocalFolderToS3 } from "../../../shared/services";


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
            const { data }: any = await encodeVideo(payload?.filename);
            const response = await uploadLocalFolderToS3(data?.folderName);

            const entryFile = response?.find((d: any) => d.key?.includes(".mpd"));
            const dbPayload = { url: entryFile?.Location };

            const dbRes = await this.reelsRepository.insertOne(dbPayload);
            return { data: dbRes, error: null };
        } catch (error: any) {
            console.error(error)
            return { data: null, error: error?.error };
        }
    }
}


export default UserService;