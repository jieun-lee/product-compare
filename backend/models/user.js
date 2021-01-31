import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    pin: {
        type: Number,
        required: true
    },
    meta: {}
});

const User = mongoose.model('User', userSchema);

export default User;