import { Mongoose } from 'mongoose';
import List from '../models/list';
import Item from '../models/item';

/**
 * Gets list with the given listId
 * @param listId
 */
export const getList = async (req, res) => {
    const { listId } = req.params;
    if (!Mongoose.Types.ObjectId.isValid(listId)) return res.status(404).send('Invalid list id');
    try {
        const list = await List.findById(listId);
        res.status(200).json(list);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

/**
 * Updates the list with the given listId
 * @param listId
 * @body
 */
export const updateList = async (req, res) => {
    const { listId } = req.params;
    const list = req.body;
    if (!Mongoose.Types.ObjectId.isValid(listId)) return res.status(404).send('Invalid list id');
    const updatedList = await User.findByIdAndUpdate(listId, list, { new: true });
    res.json(updatedList);
}

/**
 * Deletes the list with the given listId
 * @param listId
 */
export const deleteList = async (req, res) => {
    const { listId } = req.params;
    if (!Mongoose.Types.ObjectId.isValid(listId)) return res.status(404).send('Invalid list id');
    await List.findByIdAndRemove(listId);
    res.json({ message: 'List deleted' });
}

/**
 * Creates an item with the given object for the given list
 * @param listId
 * @body
 */
export const createItem = async (req, res) => {
    const { listId } = req.params;
    if (!Mongoose.Types.ObjectId.isValid(listId)) return res.status(404).send('Invalid list id');
    const item = new Item(req.body);
    const itemId = item._id;
    try {
        await item.save();
        await List.findByIdAndUpdate(listId, { $push: { items: itemId} });
        res.status(201).json(item);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}