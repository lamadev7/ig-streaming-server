
class ReelsDao {
    reelsDb: any;

    constructor({ reelsDb }: any) {
        this.reelsDb = reelsDb;

        this.insertOne = this.insertOne.bind(this);
    }

    async insertOne(payload: Object) {
        return await this.reelsDb.insertOne(payload);
    }
}

export default ReelsDao;