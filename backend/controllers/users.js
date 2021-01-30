import User from '../models/user.js';
import mongoose from 'mongoose';

/**
 * Creates a user with the given object
 * @body
 */
export const createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        // TODO: add check if the username already exists
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

/**
 * Gets user with given username
 * @param username
 */
export const getUser = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username: username });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

/**
 * Updates user with the given userId
 * @param userId
 * @body
 */
export const updateUser = async (req, res) => {
    const { userId } = req.params;
    const user = req.body;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send('Invalid user id');
    const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true });
    res.json(updatedUser);
}

/**
 * Deletes the user with the given userId
 * @param userId
 */
export const deleteUser = async (req, res) => {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send('Invalid user id');
    await User.findByIdAndRemove(userId);
    // TODO: delete lists and items
    res.json({ message: 'User deleted' });
}
