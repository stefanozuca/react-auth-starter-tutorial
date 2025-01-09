import { useHistory } from "react-router-dom";

export const EmailVerificationFail = () => {
    const history = useHistory();
    setTimeout(() => {
        history.push('/signup');
    }, 3000);

    return <div className="page-container">Email verification failed. Please try again.</div>;
}