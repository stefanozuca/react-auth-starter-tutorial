import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export const PleaseVerifyEmailPage = () => {
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            history.push('/');
        }, 3000);
    }, [history]);

    return (
        <div className="page-container">
            <h1>Thanks for signing up!</h1>
            <p>We have sent you an email to verify your account. Please check your email and click on the link to verify your account.</p>
        </div>
    );
};