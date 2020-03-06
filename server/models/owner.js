import { model, Schema } from 'mongoose';

const OwnerSchema = new Schema({
    name: String,
    about: String,
    photo: String
});


module.exports = model("Owner", OwnerSchema);