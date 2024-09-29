
class ReelsDao {
    reelsDb: any;

    constructor({ reelsDb }: any) {
        this.reelsDb = reelsDb;

        this.find = this.find.bind(this);
        this.insertOne = this.insertOne.bind(this);
    }

    async find() {
        return await this.reelsDb.find();
    }

    async insertOne(payload: Object) {
        return await this.reelsDb.create(payload);
    }
}

export default ReelsDao;