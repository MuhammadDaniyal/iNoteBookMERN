import React from 'react'
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
    const location = useLocation()
    // useEffect(() => {
    //     console.log(location.pathname);
    // }, [location])

    let navigate = useNavigate()
    
    function handleLogout() {
        localStorage.removeItem('token')
        navigate("/login")
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand ms-3" to="/">iNoteBook</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 me-2">
                            <li className="nav-item me-3">
                                <NavLink className={`nav-link ${location.pathname === "/" ? 'active' : ''}`} to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={`nav-link ${location.pathname === "/about" ? 'active' : ''}`} to="/about">About</NavLink>
                            </li>
                        </ul>
                        {
                            (!localStorage.getItem('token')) ?
                                <form className='d-flex'>
                                    <NavLink className="btn btn-primary mx-2"
                                        style={{ 'backgroundColor': 'white', 'color': 'black', 'fontWeight': 'bold' }}
                                        to='/login'
                                        role="button">Login</NavLink>
                                    <NavLink className="btn btn-primary mx-2"
                                        style={{ 'backgroundColor': 'white', 'color': 'black', 'fontWeight': 'bold' }}
                                        to='/signup'
                                        role="button">SignUp</NavLink>
                                </form> :
                                <NavLink className="btn btn-primary mx-2"
                                    style={{ 'backgroundColor': 'white', 'color': 'black', 'fontWeight': 'bold' }}
                                    role="button"
                                    onClick={handleLogout}>Logout</NavLink>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar