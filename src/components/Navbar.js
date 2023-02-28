import React from 'react'
import { Link, useNavigate,useLocation } from 'react-router-dom'
import { auth } from '../firebase';

function Navbar() {
    const location = useLocation()
    const history = useNavigate()
    const handleLogout = async () => {
        await auth.signOut();
        history('/login')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/docs">@Health</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/addoc' ? 'active' : ""}`} aria-current="page" to="/addoc">Add Doc</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/docs' ? 'active' : ""}`} to="/docs">Docs</Link>
                            </li>
                        </ul>
                        <div className="d-flex" onClick={handleLogout}>
                            <button className="btn btn-dark">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
