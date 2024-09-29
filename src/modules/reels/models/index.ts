import mongoose from "mongoose";


const reelsSchema = new mongoose.Schema({
    url: String
});

const reelsModel = mongoose.model('Reels', reelsSchema);

export default reelsModel;