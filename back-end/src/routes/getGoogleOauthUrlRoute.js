import { getGoogleOauthUrl } from '../util/getGoogleOauthUrl';

export const getGoogleOauthUrlRoute = {
    path: '/auth/google/url',
    method: 'get',
    handler: (req, res) => {
        res.status(200).json({ url: getGoogleOauthUrl() });
    }
}