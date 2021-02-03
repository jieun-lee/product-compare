import mongoose from 'mongoose';
import User from '../models/user.js';
import List from '../models/list.js';
import { arrayToObject } from '../utils/index.js';

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
    // TODO: need to authenticate with pin
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
    await List.deleteMany({ userId: userId });
    res.json({ message: 'User deleted' });
}

/**
 * Get lists for the given user
 * @param userId
 */
export const getLists = async (req, res) => {
    const { userId } = req.params;
    try {
        const lists = await List.find({ userId: userId });
        res.status(200).json(arrayToObject(lists));
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}