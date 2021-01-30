import mongoose from 'mongoose';

const listSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imageUrl: String,
});

const List = mongoose.model('List', listSchema);

export default List;