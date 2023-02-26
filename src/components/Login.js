import { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
    const history = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);
            console.log('Login successful');
            history('/home')
        } catch (error) {
            console.error('Error logging in: ', error);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit">Log In</button>
        </form>
    );
}

export default Login