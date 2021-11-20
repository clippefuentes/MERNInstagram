import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'

const Signup = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const PostData = async () => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        console.log(emailRegex.test(email))
        console.log(email)
        if (!emailRegex.test(email)) {
            M.toast({
                html: "Input email properly",
                classes: "red darker-3"
            })
        } else {
            const res = await fetch('/signup', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, password, email
                })
            })
            const data = await res.json()
            if (data.error) {
                M.toast({
                    html: data.error,
                    classes: "red darker-3"
                })
            } else {
                M.toast({
                    html: data.message,
                    classes: "green darken-1"
                })
                navigate('/login')
            }
            console.log(data)
        }
      
    }
    return (
        <div className="my-card">
            <div className="card auth-card input-field">
                <h2 className="brand-logo"> Clynestagram </h2>
                <input type="text" placeholder="Name" value={name} onChange={(e) => { setName(e.target.value)}}/>
                <input type="email" placeholder="Email" value={email}
                    onChange={(e) => { setEmail(e.target.value)}}/>
                <input type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value)}}/>
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