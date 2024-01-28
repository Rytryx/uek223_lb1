import { Request, Response } from 'express';
import { generateToken } from './jwt';
import { Database } from '../database/database';

const db = new Database();

export async function login(req: Request, res: Response) {
    try {
        const { username, password } = req.body;
        const user = await db.getUserByUsername(username);

        if (!user) {
            return res.status(401).json({ message: 'Benutzer nicht gefunden' });
        }

        if (password !== user.password) {
            return res.status(401).json({ message: 'Ungültige Anmeldeinformationen' });
        }

        const token = generateToken({ id: user.id, username: user.username, role: user.role });
        
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
}
