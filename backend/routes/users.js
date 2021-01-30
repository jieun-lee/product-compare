import express from 'express';
import { createUser, getUser, updateUser, deleteUser, getLists } from '../controllers/users.js';

const router = express.Router();

// http://localhost:5000/users

router.post('/', createUser);
router.get('/:username', getUser);
router.patch('/:userId', updateUser);
router.delete('/:userId', deleteUser);
router.get('/:userId/lists', getLists);

export default router;