import { Schema, model } from 'mongoose'

const Comics = new Schema({
    id_comic: Number,
    title: String,
    description: String,
    thumbnail:String,
    date: String
}, { timestamps: true });

export default model("Comics", Comics)