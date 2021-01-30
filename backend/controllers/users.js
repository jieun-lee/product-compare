import User from '../models/user';
import List from '../models/list';
import { Mongoose } from 'mongoose';

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
 * Creates a user with the given object
 * @body
 */
export const createUser = async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(409).json({ message: error.message });
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
    if (!Mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send('Invalid user id');
    const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true });
    res.json(updatedUser);
}

/**
 * Deletes the user with the given userId
 * @param userId
 */
export const deleteUser = async (req, res) => {
    const { userId } = req.params;
    if (!Mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send('Invalid user id');
    await User.findByIdAndRemove(userId);
    res.json({ message: 'User deleted' });
}

/**
 * Creates a list with the given object for the given user
 * @param userId
 * @body
 */
export const createList = async (req, res) => {
    const { userId } = req.params;
    if (!Mongoose.Types.ObjectId.isValid(userId)) return res.status(404).send('Invalid user id');
    const list = new List(req.body);
    const listId = list._id;
    try {
        await list.save();
        await User.findByIdAndUpdate(userId, { $push: { lists: listId } });
        res.status(201).json(list);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}