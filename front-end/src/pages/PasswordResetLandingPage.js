import { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { PasswordResetSuccess } from './PasswordResetSuccess';
import { PasswordResetFail } from './PasswordResetFail';


export const PasswordResetLandingPage = () => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { passwordResetCode } = useParams();

    const handleResetPassword = async () => {
        try {
            await axios.post(`/api/users/${passwordResetCode}/reset-password`, { newPassword: password });
            setIsSuccess(true);
        } 
        catch (e) {
            setIsFailure(true);
        }
    }



    if (isFailure) return <PasswordResetFail />;
    if (isSuccess) return <PasswordResetSuccess />;
    
    return (
        <div className="content-container">
            <h1>Reset Password</h1>
            <p>Please enter a new password...</p>
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} />
            <input 
                type="password"
                placeholder="Type Password Again" 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} />
            <button
                disabled={!password || !confirmPassword || password !== confirmPassword}
                onClick={handleResetPassword}>Reset Password</button>
        </div>
    )
}