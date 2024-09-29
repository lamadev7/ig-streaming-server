import { IUploadReelsPayload } from "../types";


class ReelsRepository {
    reelsDao: any;

    constructor({ reelsDao }: any) {
        this.reelsDao = reelsDao;

        this.find = this.find.bind(this);
        this.insertOne = this.insertOne.bind(this);
    }

    async find() {
        return await this.reelsDao.find();
    }

    async insertOne(params: IUploadReelsPayload) {
        return await this.reelsDao.insertOne(params);
    }

}

export default ReelsRepository;