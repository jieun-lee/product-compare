import express from 'express';
import { getList, updateList, deleteList, createItem } from '../controllers/lists.js';

const router = express.Router();

// http://localhost:5000/lists

router.get('/:listId', getList);
router.patch('/:listId', updateList);
router.delete('/:listId', deleteList);

router.post('/:listId/items', createItem);

export default router;