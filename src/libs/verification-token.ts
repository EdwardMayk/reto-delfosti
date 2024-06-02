import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserRole } from '../utils/enum/user-role.enum';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const decoded = jwt.verify(token, 'secretKey');
        (req as any).user = decoded;
        next();
    } catch (err) {
        return res.sendStatus(403);
    }
};


export const isAuthorized = (roles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
       if (!roles.includes((req as any).user.role)) {
           return res.sendStatus(403).json({ message: 'Unauthorized' });
         }
        next();
    };
};