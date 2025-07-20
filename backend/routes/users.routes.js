import express from 'express';
import { getUsers,   getTopUsers,createUser } from '../controllers/users.controller.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/top', getTopUsers);
router.post('/', createUser);

export default router;