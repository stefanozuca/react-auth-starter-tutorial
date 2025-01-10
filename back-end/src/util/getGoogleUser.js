import axios from 'axios';
import { oauthClient } from './oauthClient';

const getAccessAndBearerTokenUrl = ({ accessToken }) => {
    return `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`;
}

export const getGoogleUser = async ({ code }) => {
    const { tokens } = await oauthClient.getToken(code);
    const response = await axios.get(
        getAccessAndBearerTokenUrl(
            { accessToken: tokens.access_token }),
            { headers: { Authorization: `Bearer ${tokens.access_token}` } });
            
    return response.data;
}


