import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Signup = () => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const PostData = async () => {
        const res = await fetch('http://localhost:5000/signup', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, password, email
            })
        })
        const data = await res.json()
    }
    return (
        <div className="my-card">
            <div className="card auth-card input-field">
                <h2 className="brand-logo"> Clynestagram </h2>
                <input type="text" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value)}}/>
                <input type="email" placeholder="Email" value={password} onChange={(e) => { setPassword(e.target.value)}}/>
                <input type="password" placeholder="Password" value={email} onChange={(e) => { setEmail(e.target.value)}}/>
                <button className="btn waves-effect waves-light blue darken-1" type="submit" name="action" onClick={PostData}>
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