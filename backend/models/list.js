import mongoose from 'mongoose';

const listSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: String,
    items: [ObjectId]
});

const List = mongoose.model('List', listSchema);

export default List;