import express from 'express';
import loginApi from './sessions';
import usersApi from './users';
import uploadedImagesApi from './uploaded-images';
import booksApi from './books';
import personalApi from './personal';
import userBookApi from './user-book';

const router = express.Router();
router.use('/sessions', loginApi);
router.use('/users', usersApi);
router.use('/uploaded-images', uploadedImagesApi);
router.use('/books', booksApi);
router.use('/personal', personalApi);
router.use('/userBook',userBookApi);
export default router;
