import express from 'express';
import { createList, getList, updateList, deleteList, getItems } from '../controllers/lists.js';

const router = express.Router();

// http://localhost:5000/lists

router.post('/', createList),
router.get('/:listId', getList);
router.patch('/:listId', updateList);
router.delete('/:listId', deleteList);
router.get('/:listId/items', getItems);

export default router;