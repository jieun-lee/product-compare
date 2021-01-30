import Item from '../models/item';

/**
 * Gets list with the given itemId
 * @param itemId
 */
export const getItem = async (req, res) => {
    const { itemId } = req.params;
    if (!Mongoose.Types.ObjectId.isValid(itemId)) return res.status(404).send('Invalid item id');
    try {
        const item = await Item.findById(itemId);
        res.status(200).json(item);
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
    if (!Mongoose.Types.ObjectId.isValid(itemId)) return res.status(404).send('Invalid item id');
    const updatedItem = await User.findByIdAndUpdate(itemId, item, { new: true });
    res.json(updatedItem);
}

/**
 * Deletes the item with the given itemId
 * @param itemId 
 */
export const deleteItem = async (req, res) => {
    const { itemId } = req.params;
    if (!Mongoose.Types.ObjectId.isValid(itemId)) return res.status(404).send('Invalid item id');
    await Item.findByIdAndRemove(itemId);
    res.json({ message: 'Item deleted' });
}
