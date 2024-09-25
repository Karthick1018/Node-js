import { Router } from 'express';
const router = Router();
import { getUsers, createUser, updateUser, deleteUser } from '../controller/UserController.js';

router.get('/user', getUsers);
router.post('/create', createUser);
router.post('/edit/:_id', updateUser);
router.delete('/delete/:_id', deleteUser)

export default router;
