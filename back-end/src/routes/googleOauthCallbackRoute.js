import jwt from 'jsonwebtoken';
import { getGoogleUser } from '../util/getGoogleUser';
import { updateOrCreateUserFromOauth } from '../util/updateOrCreateUserFromOauth';

export const googleOauthCallbackRoute = {
    path: '/auth/google/callback',
    method: 'get',
    handler: async (req, res) => {
        const { code } = req.query;
        
        const googleUser = await getGoogleUser({ code });
        const user = await updateOrCreateUserFromOauth({ oauthUserInfo: googleUser });
        
        const { _id: id, isVerified, email, info } = user;
        jwt.sign(
            { id, isVerified, email, info }, 
            process.env.JWT_SECRET,
            (err, token) => {
                if (err) return res.status(500).send(err);
                res.redirect(`http://localhost:3000/login?token=${token}`);
            });
    }
}
