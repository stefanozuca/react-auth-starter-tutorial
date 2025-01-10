import { v4 as uuid } from 'uuid';
import { sendEmail } from '../util/sendEmail';
import { getDbConnection } from '../db';

export const forgotPasswordRoute = {
    path: '/api/forgot-password',
    method: 'post',
    handler: async (req, res) => {
        const { email } = req.body;
        
        const passwordResetCode = uuid();

        const db = await getDbConnection(process.env.DB_NAME);
        const result = await db.collection('users')
            .updateOne({ email },
                { $set: { passwordResetCode } }
            );
            
        if (result.modifiedCount > 0) {
            try {
                await sendEmail(
                    email,
                    'Password Reset',
                    `Click here to reset your password: http://localhost:3000/reset-password/${passwordResetCode}`
                );
            } 
            catch (e) {
                console.log(e);
                res.sendStatus(500);
                return;
            }
        }

        res.sendStatus(200);
    }
}
