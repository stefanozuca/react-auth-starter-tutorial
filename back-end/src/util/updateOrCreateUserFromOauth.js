import { getDbConnection } from '../db';

export const updateOrCreateUserFromOauth = async ({ oauthUserInfo }) => {

    const {
        id: googleId,
        verified_email: isVerified,
        email,
    } = oauthUserInfo;

    const db = await getDbConnection(process.env.DB_NAME);
    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
        const result = await db.collection('users')
            .findOneAndUpdate(
                { email }, 
                { $set: { googleId, isVerified } },
                { returnDocument: 'after' });

        return result.value;
    } else {
        const result = await db.collection('users').insertOne({
            email,
            googleId,
            isVerified,
            info: {},
        });
        return result.ops[0];
    }
}
