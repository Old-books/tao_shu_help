import express from 'express';
import loginApi from './sessions';
import usersApi from './users';
const router = express.Router();
router.use('/sessions', loginApi);
router.use('/users',usersApi);
export default router;
