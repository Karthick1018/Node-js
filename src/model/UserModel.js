import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
    name: String,
    age: String,
    mobile: Number,
}, { collection: 'User' });

const UserModel = model('User', UserSchema)

export default UserModel;