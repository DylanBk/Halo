import { Request, Response, NextFunction } from 'express';
import pool from '../config/db';


export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = req.body;

        console.log(data);

        return

        const q = pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
            [data.username, data.email, data.password]
        );

        if (q.rowCount === 1) {
            res.status(201).json({
                ok: true,
                message: "Created new user successfully",
            });
        } else {
            res.status(500).json({
                ok: false,
                message: "Failed to create user",
            });
        };
    } catch (e) {
        next(e);
    };
};