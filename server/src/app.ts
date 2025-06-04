import cors from 'cors';
import express from 'express';

import config from './config/config';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors({
    credentials: true,
    origin: config.clientUrl
}));
app.use(express.json());

// route handlers
app.use('/user', userRoutes)
app.use('/post', postRoutes);

// global error handler
app.use(errorHandler);


export default app;