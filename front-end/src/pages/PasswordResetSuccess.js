import { useHistory } from 'react-router-dom';

export const PasswordResetSuccess = () => {
    const history = useHistory();
    return (
        <div className="content-container">
            <h1>Success!</h1>
            <p>Your password has been reset. Please login again.</p>
            <button onClick={() => history.push('/login')}>Go to login</button>
        </div>
    )
}