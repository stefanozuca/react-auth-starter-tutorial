import {useState} from 'react'
import {useHistory} from 'react-router-dom' 



export const SignUpPage = () => {
    const [errorMessage, setErrorMessage] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const history = useHistory()

    const handleSignUp = () => {
        console.log('Sign Up')
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
