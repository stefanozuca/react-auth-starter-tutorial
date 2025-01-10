import { testRoute } from './testRoute';
import { singUpRoute } from './singUpRoute';
import { logInRoute } from './logInRoute';
import { updateUserInfoRoute } from './updateUserInfo';
import { verifyEmailRoute } from './verifyEmailRoute';
import { forgotPasswordRoute } from './forgotPasswordRoute';
import { resetPasswordRoute } from './resetPasswordRoute';  
import { getGoogleOauthUrlRoute } from './getGoogleOauthUrlRoute';
import { googleOauthCallbackRoute } from './googleOauthCallbackRoute';


export const routes = [
    testRoute,
    singUpRoute,
    logInRoute,
    updateUserInfoRoute,
    verifyEmailRoute,
    forgotPasswordRoute,
    resetPasswordRoute,
    getGoogleOauthUrlRoute,
    googleOauthCallbackRoute,
];

