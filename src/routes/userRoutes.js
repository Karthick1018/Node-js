import { Router } from 'express';
const router = Router();
import { getUsers, createUser, updateUser, deleteUser } from '../controller/UserController.js';
import Auth from '../middleware.js';

router.get('/user', Auth, getUsers);
router.post('/create', Auth, createUser);
router.post('/edit/:_id', Auth, updateUser);
router.delete('/delete/:_id', Auth, deleteUser)

export default router;
