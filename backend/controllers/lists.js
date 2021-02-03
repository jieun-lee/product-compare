import mongoose from 'mongoose';
import List from '../models/list.js';
import Item from '../models/item.js';
import { arrayToObject } from '../utils/index.js';

/**
 * Creates a list with the given object
 * @body
 */
export const createList = async (req, res) => {
    const list = new List(req.body);
    const listId = list._id;
    // TODO: check if list.userId is valid
    try {
        await list.save();
        res.status(201).json({ [listId]: list });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

/**
 * Gets list with the given listId
 * @param listId
 */
export const getList = async (req, res) => {
    const { listId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(listId)) return res.status(404).send('Invalid list id');
    try {
        const list = await List.findById(listId);
        res.status(200).json({ [listId]: list });
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
    if (!mongoose.Types.ObjectId.isValid(listId)) return res.status(404).send('Invalid list id');
    const updatedList = await List.findByIdAndUpdate(listId, list, { new: true });
    res.json({ [listId]: updatedList });
}

/**
 * Deletes the list with the given listId
 * @param listId
 */
export const deleteList = async (req, res) => {
    const { listId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(listId)) return res.status(404).send('Invalid list id');
    await List.findByIdAndRemove(listId);
    await Item.deleteMany({ listId: listId });
    res.json({ message: 'List deleted' });
}

/**
 * Get items for the given list
 * @param listId
 */
export const getItems = async (req, res) => {
    const { listId } = req.params;
    try {
        const items = await Item.find({ listId: listId });
        res.status(200).json(arrayToObject(items));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}