import { Request, Response, NextFunction } from 'express';
import pool from '../config/db';
import encrypt from '../utils/encPw';
import checkPw from '../utils/checkPw';


export const userExists = async (
    options: {
        id?: number | null,
        email?: string | null,
        username?: string | null
    },
    next: NextFunction
) => {
    try {
        let q: any;

        if (options.id) {
            q = await pool.query('SELECT * FROM users WHERE id = $1', [options.id]);
        } else if (options.email) {
            q = await pool.query('SELECT * FROM users WHERE email = $1', [options.email]);
        } else if (options.username) {
            q = await pool.query('SELECT * FROM users WHERE username = $1', [options.username]);
        } else {
            return false;
        };

        return q.rowCount > 0 as boolean;
    } catch (e) {
        next(e);

        return false;
    };
};

export const createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = req.body;

        const emailCheck = await userExists({email: data.email}, next);
        const usernameCheck = await userExists({username: data.username}, next);

        if (emailCheck) {
            res.status(400).json({
                ok: false,
                message: "User already exists",
                error: "An account with that email already exists."
            });
        } else if (usernameCheck) {
            res.status(400).json({
                ok: false,
                message: "User already exists",
                error: "Username already taken."
            });
        };

        data.password = await encrypt(data.password);

        const q = await pool.query(
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

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = req.body;
        console.log(data)

        let q: any;

        if (data.id as number) {
            q = await pool.query('SELECT * FROM users WHERE id = $1', [data.id]);
        } else if (data.email as string) {
            q = await pool.query('SELECT * FROM users WHERE email = $1', [data.email]);
        } else {
            q = await pool.query('SELECT * FROM users WHERE username = $1', [data.username]);
        };

        if (q.rowCount > 0) {
            const userData = {
                id: q.rows[0].id,
                username: q.rows[0].username,
                email: q.rows[0].email,
                role: q.rows[0].role,
                pfp: q.rows[0].pfp || null,
                following: q.rows[0].following || [],
                followers: q.rows[0].followers || [],
                mutuals: q.rows[0].mutuals || [],
                posts: q.rows[0].posts || [],
                comments: q.rows[0].comments || [],
                liked_posts: q.rows[0].liked_posts || [],
                reposted_posts: q.rows[0].reposted_posts || [],
                shared_posts: q.rows[0].shared_posts || [],
                saved_posts: q.rows[0].saved_posts || [],
                created_at: q.rows[0].created_at
            };

            res.status(200).json({
                ok: true,
                message: "User data retrieved successfully",
                data: userData
            })
        } else {
            res.status(404).json({
                ok: false,
                message: "User not found",
                error: "No user found with the provided information."
            });
        }
    } catch (e) {
        next(e);
    };
};

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = req.body;

        const q = await pool.query('SELECT * FROM users WHERE email = $1', [data.email]);

        const check = await checkPw(data.password, q.rows[0].password);

        if (check) {
            req.session.user = {
                id: q.rows[0].id,
                username: q.rows[0].username,
                email: q.rows[0].email,
                role: q.rows[0].role,
            };
            res.status(200).json({
                ok: true,
                message: "Logged in successfully"
            });
        } else {
            res.status(400).json({
                ok: false,
                message: "Failed to login",
                error: "Password incorrect, please try again."
            });
        };
    } catch (e) {
        next(e);
    };
};






//! -----------------------------------------------------------------------------
//! remove before deployment
export const testSession = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.user) {
        res.status(200).json({
            ok: true,
            user: req.session.user
        });
    } else {
        res.status(401).json({
            ok: false,
            message: "Unauthorized"
        });
    };
};