import { useState } from 'react';
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const history = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [progress, setProgress] = useState(false)

    const handleLogin = async (e) => {
        setProgress(true)
        e.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password);
            console.log('Login successful');
            history('/docs')
        } catch (error) {
            console.error('Error logging in: ', error.message);
            toast.error((error.message.split('.'))[0])
        }
        setProgress(false)
    };

    return (
        <>
            {progress && (
                <>
                    <div className="overlay"></div>
                    <div className="spanner">
                        <div className="loader"></div>
                        <p>Logging User, please be patient.</p>
                    </div>
                </>
            )}
            <section className="vh-100">
                <div className="container-fluid h-75">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <Header />
                        <div className="col-md-9 col-lg-6 col-xl-5">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                className="img-fluid" alt="Sample" />
                        </div>
                        <div className="col-md-10 col-lg-6 col-xl-4 offset-xl-1">
                            <form onSubmit={handleLogin}>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                    <p className="text-center h1 fw-bold mb-4 mx-md-0 mt-4">Sign In</p>
                                </div>
                                <div className="form-outline mb-3">
                                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                                    <input type="email" id="form3Example3" className="form-control " value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="form-outline mb-2">
                                    <label className="form-label" htmlFor="form3Example4">Password</label>
                                    <input type="password" id="form3Example4" className="form-control " value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="text-center text-lg-start mt-2 pt-2">
                                    <p className="small fw mt-0 pt-1 mb-3">Don't have an account? <Link to='/'
                                        className="link-danger">Register</Link></p>
                                    <button type="submit" className="btn btn-primary btn-lg"
                                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
}

export default Login