import { Request, Response } from 'express';
import { generateToken } from './jwt';
import { Database } from '../database/database';

const db = new Database();

export async function register(req: Request, res: Response) {
    try {
        console.log('Received registration request:', req.body);
        const { username, password } = req.body;
        const role = 'user';

        const existingUser = await db.getUserByUsername(username);

        if (existingUser) {
            return res.status(400).json({ message: 'Benutzername bereits vergeben' });
        }

        const savedPassword = password;

        const registrationSuccessful = await db.registerUser(username, savedPassword, role);

        if (registrationSuccessful) {
            const newUser = { id: registrationSuccessful.insertId, username, role };
            const token = generateToken(newUser);
            res.json({ token });
        } else {
            res.status(500).json({ message: 'Fehler bei der Registrierung' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Interner Serverfehler' });
    }
}
