import { Request, Response, NextFunction } from "express";
import pool from '../config/config';

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
    console.log('client requested posts')
};