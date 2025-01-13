import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDbConnection } from '../db';

export const logInRoute = {
    path: '/api/login',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;

        const db = getDbConnection(process.env.DB_NAME);
        const user = await db.collection('users').findOne({ email });

        if (!user) 
            return res.status(401);
        

        const { _id: id, isVerified, passwordHash, salt, info } = user;
        const pepper = process.env.PEPPER_STRING;
        
        const isPasswordCorrect = await bcrypt.compare(salt + password + pepper, passwordHash);

        if (!isPasswordCorrect)
            return res.status(401).send('Invalid email or password');

        const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
            isVerified: isVerified,
            info: info,
        }, 
        process.env.JWT_SECRET,
        { expiresIn: '2d' },
        (err, token) => {
            if (err) {
                res.status(500).send({ message: 'Error generating token' });
                console.log(err);
            } 
            res.status(200).send({ token });
        });
    }
}
