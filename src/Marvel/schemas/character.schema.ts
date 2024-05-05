import { Schema, model } from 'mongoose'

const characterMarvel = new Schema({
    id_hero: Number,
    name: String,
    description: String,
    thumbnail:String
}, { timestamps: true });

export default model("CharacterMarvel", characterMarvel)