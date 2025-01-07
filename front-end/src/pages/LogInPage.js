import {useState} from 'react'
import {useHistory} from 'react-router-dom' 



export const LogInPage = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const handleLogIn = () => {
        console.log('Log In')
    }

    const handleForgotPassword = () => history.push('/forgot-password')
    
    const handleSignUp = () => history.push('/signup')
    

    return (
        <div className="content-container">
            <h1>Log In</h1>
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

            <button 
                disabled={!email || !password}
                onClick={handleLogIn}>Log In</button>

            <button onClick={handleForgotPassword}>Forgot Password?</button>

            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
};
