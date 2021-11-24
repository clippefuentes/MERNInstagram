import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import M from 'materialize-css'


const Reset = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')

    const reset = async () => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        console.log(emailRegex.test(email))
        console.log(email)
        try {
            if (!emailRegex.test(email)) {
                M.toast({
                    html: "Input email properly",
                    classes: "red darker-3"
                })
            } else {
                const res = await fetch('/resetPassword', {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email
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
                        html: "User Password Reset",
                        classes: "green darken-1"
                    })
                    navigate('/login')
                }
                console.log(data)
            }
        } catch(err) {
            M.toast({ html: err.m})
        }
    }

    return (
        <div className="my-card">
            <div className="card auth-card input-field">
                <h2 className="brand-logo"> Clynestagram </h2>
                <input type="email" placeholder="Email" value={email}
                    onChange={(e) => { setEmail(e.target.value)}}/>
                <button className="btn waves-effect waves-light blue darken-1" type="submit" name="action" onClick={reset}>
                    Reset Password
                </button>
            </div>
        </div>
    )
}

export default Reset