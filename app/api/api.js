import express from 'express';
import loginApi from './sessions';
import usersApi from './users';
import uploadedImagesApi from './uploaded-images';
import booksApi from './books';
import personalApi from './personal';

const router = express.Router();
router.use('/sessions', loginApi);
router.use('/users', usersApi);
router.use('/uploaded-images', uploadedImagesApi);
router.use('/books', booksApi);
router.use('/personal', personalApi);
export default router;
