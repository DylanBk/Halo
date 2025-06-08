import cors from 'cors';
import express from 'express';
import session from 'express-session';

import config from './config/config';
import userRoutes from './routes/userRoutes';
import postRoutes from './routes/postRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();


// server middleware

app.use(cors({
    credentials: true,
    origin: config.clientUrl
}));
app.use(express.json());
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 30 * 60 * 1000, // 30 mins
        sameSite: true,
        secure: config.nodeEnv === 'development' ? false : true,
    }
}));

// route handlers
app.use('/user', userRoutes)
app.use('/post', postRoutes);

// global error handler
app.use(errorHandler);


export default app;