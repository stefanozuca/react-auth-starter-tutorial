import { useHistory } from "react-router-dom";

export const EmailVerificationSuccess = () => {
    const history = useHistory();
    setTimeout(() => {
        history.push('/');
    }, 3000);

    return <div className="page-container">Email verification successful! Redirecting...</div>;
}