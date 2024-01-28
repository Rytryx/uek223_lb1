import jwt from 'jsonwebtoken';

const secretKey = 'uek223_lb1';

export function generateToken(payload: any): string {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

export function verifyToken(token: string): any {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        throw new Error('Ungültiges Token');
    }
}
