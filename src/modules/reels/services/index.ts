import { IUploadReelsPayload } from "../types";


class UserService {
    reelsRepository: any;

    constructor({ reelsRepository }: any) {
        this.reelsRepository = reelsRepository;
    }

    async upload(params: IUploadReelsPayload) {
        try {
            const res = await this.reelsRepository.insertOne(params);

            return { data: res, error: null };

        } catch (error) {
            return { data: null, error: error };
        }
    }
}


export default UserService;