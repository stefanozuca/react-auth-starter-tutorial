import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export const ForgotPasswordPage = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const history = useHistory();

    const onSubmitClicked = async () => {
        try {
            await axios.post('/api/forgot-password', { email });
            setSuccess(true);
            setTimeout(() => {
                history.push('/login');
            }, 3000);
        } catch (e) {
            setErrorMessage(e.message);
        }
    }

    return success ? (
        <div className="content-container">
            <h1>Email sent</h1>
            <p>Please check your email for instructions to reset your password.</p>
        </div>
    ) : (
        <div className="content-container">
            <h1>Forgot Password</h1>
            <p>Please enter your email address below and we will send you instructions to reset your password.</p>
            {errorMessage && <p className="fail">{errorMessage}</p>}
            <input 
                type="email"
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} />
            <button
                disabled={!email}
                onClick={onSubmitClicked}>Reset Password</button>
            
        </div>
    );
}

export default ForgotPasswordPage;
