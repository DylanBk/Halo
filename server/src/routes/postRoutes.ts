import Router from 'express';
import { getPosts } from "../controllers/postController";


const router = Router();

router.get('/feed', getPosts);

export default router;