import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { getDbConnection } from '../db';

export const updateUserInfoRoute = {
    path: '/api/user/:userId',
    method: 'put',
    handler: async (req, res) => {

        const { authorization } = req.headers;
        const { userId } = req.params;

        if (!authorization) 
            return res.status(401).json({ message: 'Missing authorization header' });
        


        const updates = {
            favoriteFood: req.body.favoriteFood,
            hairColor: req.body.hairColor,
            bio: req.body.bio
        };


        // Bearer 12asd.asdaw.awdawd
        const token = authorization.split(' ')[1];    

        jwt.verify(token,
            process.env.JWT_SECRET, 
            async (err, decoded) => {
                if (err) return res.status(401).json({ message: 'Invalid token' });
                
                const { id, isVerified } = decoded;
                if (id !== userId) return res.status(403).json({ message: 'Not authorized' });
                if (!isVerified) return res.status(403).json({ message: 'User not verified' });

                const db = getDbConnection(process.env.DB_NAME);
                const result = await db.collection('users').findOneAndUpdate(
                    { _id: ObjectId(id) }, 
                    { $set: { info: updates } },  // Remove the nested 'info' structure unless that's intentional
                    { 
                        returnDocument: 'after',  // 'returnOriginal: false' is deprecated
                        projection: { info: 1 } // Specify fields you want returned
                    }
                );
 
                const { email, info } = result.value;
            
                jwt.sign({ id, email, isVerified, info },
                    process.env.JWT_SECRET, 
                    { expiresIn: '2d' }, 
                    (err, token) => {
                        if (err) return res.status(500).json({ message: 'Failed to generate token' });
                        res.status(200).json({ token });
                    }
                );
            });

    }
}
