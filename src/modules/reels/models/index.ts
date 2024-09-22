import mongoose from "mongoose";


const reelsSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    dob: String,
});

const reelsModel = mongoose.model('Reels', reelsSchema);

export default reelsModel;