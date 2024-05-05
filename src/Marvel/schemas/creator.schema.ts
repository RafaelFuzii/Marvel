import { Schema, model } from 'mongoose'

const serieSchema = new Schema({
    name: String,
})

const creatorMarvel = new Schema({
    name: String,
    funcao: String,
    thumbnail:String,
    series: [serieSchema]
}, { timestamps: true });

export default model("Creator", creatorMarvel)