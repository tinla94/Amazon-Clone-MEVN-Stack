import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: "Address"
    }
});


module.exports = model("User", UserSchema);