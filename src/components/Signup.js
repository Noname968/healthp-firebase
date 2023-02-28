import React, { useState } from 'react';
import { auth, firestore } from '../firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const history = useNavigate()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setpassword2] = useState('');
  const [progress, setProgress] = useState(false)

  const notifysuccess = () => {
    toast.success('User created successfully', {
      autoClose: 2000,
      onClose: () => {
        history('/docs');
      }
    });
  }
  const notifyfailure = () => toast.error('Error creating user');
  const notifyfailcreate = () => toast.error('User Already Exists');

  const handleSubmit = (event) => {
    event.preventDefault();
    auth.fetchSignInMethodsForEmail(email)
      .then(async (signInMethods) => {
        if (signInMethods.length > 0) {
          notifyfailcreate()
        } else {
          if (password === password2) {
            setProgress(true)
            try {
              const { user } = await auth.createUserWithEmailAndPassword(email, password);
              await firestore.collection('users').doc(user.uid).set({
                email,
                createdAt: new Date()
              });
              console.log('User created successfully');
              notifysuccess()
            }
            catch (error) {
              console.error('Error creating user: ', error);
              notifyfailure();
            }
          }
          else {
            window.alert('Passwords do not match');
          }
          setProgress(false)
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      {progress && (
        <>
          <div className="overlay"></div>
          <div className="spanner">
            <div className="loader"></div>
            <p>Creating User, please be patient.</p>
          </div>
        </>
      )}
      <section className="vh-100" style={{ margin: "0" }}>
        <div className="container h-75">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <Header />
            <div className=" col-lg-12 col-xl-11" style={{ borderRadius: "23px" }}>
              <div className="card-body p-md-7">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid" alt="Sample" />
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                    <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                      <div className="d-flex flex-row align-items-center mb-3">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        {/* <div className="form-outline flex-fill mb-0">
                          <input type="text" id="form3Example1c" className="form-control" value={name} onChange={(e) => { setname(e.target.value) }} />
                          <label className="form-label" htmlFor="form3Example1c">Your Name</label>
                        </div> */}
                      </div>
                      <div className="d-flex flex-row align-items-center mb-3">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                          <input type="email" id="form3Example3c" className="form-control" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-3">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example4c">Password</label>
                          <input type="password" id="form3Example4c" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} required minLength={8} />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-3">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                          <input type="text" id="form3Example4cd" className="form-control" value={password2} onChange={(e) => { setpassword2(e.target.value) }} required minLength={8} />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-3">
                        <p className="grey-text text-darken-1 mx-3">
                          Already have an account? <Link to="/login" className='link-danger'>Log in</Link>
                        </p>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button type="submit" className="btn btn-primary btn-lg">Register</button>
                      </div>
                    </form>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}

export default Signup;