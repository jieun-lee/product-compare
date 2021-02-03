import mongoose from 'mongoose';
import Item from '../models/item.js';

/**
 * Creates an item with the given object
 * @body
 */
export const createItem = async (req, res) => {
    const item = new Item(req.body);
    const itemId = item._id;
    // TODO: check if item.listId is valid
    try {
        await item.save();
        res.status(201).json({ [itemId]: item });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

/**
 * Gets list with the given itemId
 * @param itemId
 */
export const getItem = async (req, res) => {
    const { itemId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(itemId)) return res.status(404).send('Invalid item id');
    try {
        const item = await Item.findById(itemId);
        res.status(200).json({ [itemId]: item });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

/**
 * Updates the item with the given itemId
 * @param itemId
 * @body
 */
export const updateItem = async (req, res) => {
    const { itemId } = req.params;
    const item = req.body;
    if (!mongoose.Types.ObjectId.isValid(itemId)) return res.status(404).send('Invalid item id');
    const updatedItem = await Item.findByIdAndUpdate(itemId, item, { new: true });
    res.json({ [itemId]: updatedItem });
}

/**
 * Deletes the item with the given itemId
 * @param itemId 
 */
export const deleteItem = async (req, res) => {
    const { itemId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(itemId)) return res.status(404).send('Invalid item id');
    await Item.findByIdAndRemove(itemId);
    res.json({ message: 'Item deleted' });
}
