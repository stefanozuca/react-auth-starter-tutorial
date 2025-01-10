import { useHistory } from 'react-router-dom';

export const PasswordResetFail = () => {
    const history = useHistory();
    return (
        <div className="content-container">
            <h1>Failed</h1>
            <p>Your password has not been reset. Please try again.</p>
            <button onClick={() => history.push('/forgot-password')}>Try again</button>
        </div>
    )
}