import { Request, Response } from 'express';
import { User } from '../../users/entities/user.entity';
import { UserRepository } from '../../users/repository/user.repository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signUp = async (req: Request, res: Response) => {

    console.log('req.body', req.body)

    const { name, email, password, phone, position, role, employee_code } = req.body;


    const emailExists = await UserRepository.findOne({
        where: { email: req.body.email }
    })
    if (emailExists) return res.status(400).json({ message: 'Email already exists' })

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserRepository.create({
            name,
            email,
            employee_code,
            password: hashedPassword,
            phone,
            position,
            role
        });
        await UserRepository.save(user);

        return res.status(201).json({ message: 'User created successfully' });
    
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const signIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await UserRepository.findOne({
        where: { email }
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });


    const token = jwt.sign({ id: user.id, role: user.role }, 'secretKey', { expiresIn: '1h' });

    return res.json({ message: 'Sign in successfully', token });
};

export const profile = async (req: Request, res: Response) => {

    const userId = (req as any).user.id;

    const user = await UserRepository.findOne({
        where: { id: userId }
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const { password, ...data } = user;

    return res.json(data);
};