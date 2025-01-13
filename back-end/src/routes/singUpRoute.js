import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuid } from 'uuid';
import { getDbConnection } from '../db';
import { sendEmail } from '../util/sendEmail';


export const singUpRoute = {
    path: '/api/signUp',
    method: 'post',
    handler: async (req, res) => {
        const { email, password } = req.body;

        const db = getDbConnection(process.env.DB_NAME);

        const user = await db.collection('users').findOne({ email });
        
        if (user) {
            res.status(409).send('User already exists');
        } 
        
        const salt = uuid();
        const pepper = process.env.PEPPER_STRING;

        const passwordHash = await bcrypt.hash(salt + password + pepper, 10);
        
        const verificationString = uuid();

        const startingInfo = {
            hairColor: '',
            favoriteFood: '',
            bio: '',
        };

        const result = await db.collection('users').insertOne({
            email,
            passwordHash,
            salt,
            info: startingInfo,
            isVerified: false,
            verificationString,
        });

        const { insertedId } = result;

        try {
            await sendEmail(
                email, 
                'Verify your email', 
                `
                    Thanks for signing up!

                    Click <a href="http://localhost:3000/verify-email/${verificationString}">here</a> to verify your email.
                `);
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending email');
        }

        const token = jwt.sign({
            id: insertedId,
            email,
            info: startingInfo,
            isVerified: false,
        }, 
        process.env.JWT_SECRET,
        {
            expiresIn: '2d',
        },
        (err, token) => {
            if (err) {
                res.status(500).send('Error signing token');
            } 
            res.status(200).send({ token });
        });
        
    },
};