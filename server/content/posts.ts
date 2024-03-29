import express, { Request, Response } from 'express';
import { Database } from '../database/database';

export const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const database = new Database();
        const posts = await database.executeSQL(`
            SELECT tweets.*, users.username 
            FROM tweets 
            JOIN users ON tweets.user_id = users.id
        `);
        console.log("Abgefragte Posts:", posts);
        res.status(200).json(posts);
    } catch (error) {
        console.log("Fehler beim Abrufen der Posts:", error);
        res.status(500).send('Interner Serverfehler');
    }
});


router.post('/post', async (req: Request, res: Response) => {
    const { userId, content } = req.body;
    if (!userId || !content) {
        return res.status(400).send('Benutzer-ID und Inhalt sind erforderlich.');
    }

    try {
        const database = new Database();
        await database.executeSQL(`INSERT INTO tweets (user_id, content) VALUES ('${userId}', '${content}')`);
        res.status(201).send('Beitrag erfolgreich erstellt.');
    } catch (error) {
        console.log(error);
        res.status(500).send('Interner Serverfehler');
    }
});

router.put('/post/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).send('Inhalt ist erforderlich.');
    }

    try {
        const database = new Database();
        await database.executeSQL(`UPDATE tweets SET content = '${content}' WHERE id = ${id}`);
        res.status(200).send('Beitrag erfolgreich aktualisiert.');
    } catch (error) {
        console.log(error);
        res.status(500).send('Interner Serverfehler');
    }
});

router.delete('/post/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const database = new Database();
        await database.executeSQL(`DELETE FROM tweets WHERE id = ${id}`);
        res.status(200).send('Beitrag erfolgreich gelöscht.');
    } catch (error) {
        console.log(error);
        res.status(500).send('Interner Serverfehler');
    }
});

export default router;
