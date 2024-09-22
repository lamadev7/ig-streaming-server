import { IUploadReelsPayload } from "../types";


class ReelsRepository {
    reelsDao: any;

    constructor({ reelsDao }: any) {
        this.reelsDao = reelsDao;

        this.insertOne = this.insertOne.bind(this);
    }

    async insertOne(params: IUploadReelsPayload) {
        return await this.reelsDao.insertOne(params);
    }

}

export default ReelsRepository;