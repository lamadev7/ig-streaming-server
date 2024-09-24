import { getEncodedVideo } from "../../../shared/services/videoEncoing";
import { IUploadReelsPayload } from "../types";


class UserService {
    reelsRepository: any;

    constructor({ reelsRepository }: any) {
        this.reelsRepository = reelsRepository;
    }

    async upload(payload: IUploadReelsPayload) {
        try {
            const encodedData = getEncodedVideo(payload?.filename)
            // const res = await this.reelsRepository.insertOne(payload);
            const res = {};

            return { data: res, error: null };

        } catch (error) {
            return { data: null, error: error };
        }
    }
}


export default UserService;