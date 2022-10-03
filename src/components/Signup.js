import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const host = 'http://localhost:8000'

    let navigate = useNavigate()

    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleClick = async (e) => {
        e.preventDefault()
        const {name, email, password} = credentials;
        const url = `${host}/api/auth/createuser`
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json()
        if (json.success) {
            // save the token and redirect
            localStorage.setItem('token', json.token)
            navigate('/');

        } else {
            alert('Invalid credentials, User Exist')
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
            <div className='row vh-100 d-flex justify-content-center align-items-center'>
                <div className='col-12 col-md-4'>
                    <form onSubmit={handleClick}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="name"
                                className="form-control"
                                id="name"
                                name='name'
                                onChange={onChange}
                                value={credentials.name}
                                aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name='email'
                                onChange={onChange}
                                value={credentials.email}
                                aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name='password'
                                onChange={onChange}
                                value={credentials.password}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup