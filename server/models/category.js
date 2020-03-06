import { model, Schema } from 'mongoose';

const CategorySchema = new Schema({
    type: {
        type: String,
        unique: true,
        required: true
    }
});


module.exports = model("Category", CategorySchema);