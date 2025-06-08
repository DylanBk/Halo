import { Router } from 'express';
import { createUser, getUser, login, testSession } from '../controllers/userController';


const router = Router();

router.post('/create', createUser);
router.post('/get', getUser)
router.post('/login', login);
router.get('/me', getUser);


// ! remove before deployment
router.get('/test', testSession);


export default router;