import { getDbConnection } from '../db';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

export const verifyEmailRoute = {
    path: '/api/verify-email',
    method: 'put',
    handler: async (req, res) => {
        const { verificationString } = req.body;

        const db = getDbConnection(process.env.DB_NAME);
        
        const result = await db.collection('users')
            .findOne({ verificationString });


        if (!result) return res.status(401).json({ message: 'User not found' });

        const { _id: id, email, info } = result;

        await db.collection('users')
            .updateOne({ _id: ObjectId(id) }, 
                { $set: { isVerified: true } });

        const token = jwt.sign({ id, email, info, isVerified: true }, 
            process.env.JWT_SECRET, 
            { expiresIn: '2d' }, 
            (err, token) => {
                if (err) return res.status(500).json({ message: 'Error signing token' });
                res.status(200).json({ token });
            });
    }

}
