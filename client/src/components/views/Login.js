import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    return (
        <div className="my-card">
            <div className="card auth-card input-field">
                <h2 className="brand-logo"> Clynestagram </h2>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button className="btn waves-effect waves-light blue lighten-2" type="submit" name="action">
                    Login
                </button>
                <h5>
                    <Link to="/signup">Want to create an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Login