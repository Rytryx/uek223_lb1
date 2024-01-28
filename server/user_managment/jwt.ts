import jwt from 'jsonwebtoken';

const secretKey = 'uek223_lb1';

export function generateToken(payload: any): string {
    const convertedPayload = Object.fromEntries(
        Object.entries(payload).map(([key, value]) => 
            [key, (typeof value === 'bigint') ? value.toString() : value])
    );

    return jwt.sign(convertedPayload, secretKey, { expiresIn: '1h' });
}

export function verifyToken(token: string): any {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (error) {
        throw new Error('Ungültiges Token');
    }
}
