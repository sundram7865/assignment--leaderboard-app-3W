import express from 'express';
import { claimPoints, getPointsHistory } from '../controllers/points.controller.js';

const router = express.Router();

router.post('/claim', claimPoints);
router.get('/history/:userId', getPointsHistory);

 


export default router;