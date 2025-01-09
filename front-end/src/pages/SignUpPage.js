import {useState} from 'react'
import {useHistory} from 'react-router-dom' 
import {useToken} from '../auth/useToken'
import axios from 'axios'



export const SignUpPage = () => {
    const [token, setToken] = useToken();
    const [errorMessage, setErrorMessage] = useState('')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const history = useHistory()


    const handleSignUp = async () => {
        const response = await axios.post('/api/signup', {
            email,
            password,
        });
        const {token} = response.data;
        setToken(token);
        history.push('/verify-email');
    }
    
    const handleLogIn = () => history.push('/login')
    

    return (
        <div className="content-container">
            <h1>Sign Up</h1>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <input 
                type="text" 
                placeholder="someemail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />

            <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />

            <input 
                type="password" 
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />

            <button 
                disabled={!email || !password || !confirmPassword || password !== confirmPassword}
                onClick={handleSignUp}>Sign Up</button>

            <button onClick={handleLogIn}>Already have an account? Log In</button>
        </div>
    );
};
