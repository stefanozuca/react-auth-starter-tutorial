import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import { getDbConnection } from '../db';

export const resetPasswordRoute = {
    path: '/api/users/:passwordResetCode/reset-password',
    method: 'post',
    handler: async (req, res) => {
        const { passwordResetCode } = req.params;
        const { newPassword } = req.body;

        const db = await getDbConnection(process.env.DB_NAME);

        const user = await db.collection('users').findOne({ 
            passwordResetCode 
        });
        
        if (!user) {
            return res.sendStatus(404);
        }

        const salt = uuid();
        const pepper = process.env.PEPPER_STRING;
        
        const newPasswordHash = await bcrypt.hash(salt + newPassword + pepper, 10);

        await db.collection('users').updateOne(
            { _id: ObjectId(user._id) },
            {
                $set: { passwordHash: newPasswordHash, salt: salt },
                $unset: { passwordResetCode: '' }
            }
        );

        res.sendStatus(200);
    },
}