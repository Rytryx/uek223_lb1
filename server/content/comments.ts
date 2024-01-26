import express, { Request, Response } from 'express';
import { Database } from '../database/database';

const router = express.Router();

router.post('/comment', async (req: Request, res: Response) => {
    const { userId, tweetId, content } = req.body;
    if (!userId || !tweetId || !content) {
        return res.status(400).send('Benutzer-ID, Tweet-ID und Inhalt sind erforderlich.');
    }

    try {
        const database = new Database();
        await database.executeSQL(`INSERT INTO comments (user_id, tweet_id, content) VALUES ('${userId}', '${tweetId}', '${content}')`);
        res.status(201).send('Kommentar erfolgreich erstellt.');
    } catch (error) {
        console.log(error);
        res.status(500).send('Interner Serverfehler');
    }
});

router.put('/comment/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content } = req.body;

    if (!content) {
        return res.status(400).send('Inhalt ist erforderlich.');
    }

    try {
        const database = new Database();
        await database.executeSQL(`UPDATE comments SET content = '${content}' WHERE id = ${id}`);
        res.status(200).send('Kommentar erfolgreich aktualisiert.');
    } catch (error) {
        console.log(error);
        res.status(500).send('Interner Serverfehler');
    }
});

router.delete('/comment/:id', async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const database = new Database();
        await database.executeSQL(`DELETE FROM comments WHERE id = ${id}`);
        res.status(200).send('Kommentar erfolgreich gelöscht.');
    } catch (error) {
        console.log(error);
        res.status(500).send('Interner Serverfehler');
    }
});

export default router;
