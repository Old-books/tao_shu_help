import express from 'express';
import loginApi from './sessions';
const router = express.Router();
router.use('/sessions', loginApi);
export default router;
