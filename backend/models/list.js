import mongoose from 'mongoose';

const listSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imageUrl: String,
    description: String,
    isFavourite: {
        type: Boolean,
        default: false
    }
});

const List = mongoose.model('List', listSchema);

export default List;