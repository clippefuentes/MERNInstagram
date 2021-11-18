import React from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <div className="my-card">
            <div className="card auth-card input-field">
                <h2 className="brand-logo"> Clynestagram </h2>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <button className="btn waves-effect waves-light blue lighten-2" type="submit" name="action">
                    Sign Up
                </button>
                <h5>
                    <Link to="/login">Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup