import express from 'express';
import { createList, getList, updateList, deleteList } from '../controllers/lists.js';

const router = express.Router();

// http://localhost:5000/lists

router.post('/', createList),
router.get('/:listId', getList);
router.patch('/:listId', updateList);
router.delete('/:listId', deleteList);

export default router;