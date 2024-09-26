import { Router } from "express";
import { Login, Signup } from "../controller/EmpController.js";


const router = Router()

router.post('/signUp', Signup)
router.post('/login', Login)

export default router;