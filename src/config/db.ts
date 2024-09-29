import config from ".";
import mongoose from "mongoose";

export const initSequelizeConnection = async () => { }

export const initMongoConnection = async () => {
    await mongoose.connect(config.mongoUri)
        .then(
            () => console.log("Mongodb connection successfull..."),
            (err) => console.log("Mongodb connection failed...", err)
        );
};