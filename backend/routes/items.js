import express from 'express';
import { getItem, updateItem, deleteItem } from '../controllers/items.js';

const router = express.Router();

// http://localhost:5000/items

router.get('/:itemId', getItem);
router.patch('/:itemId', updateItem);
router.delete('/:itemId', deleteItem);

export default router;