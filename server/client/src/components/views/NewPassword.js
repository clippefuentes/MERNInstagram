import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import M from 'materialize-css'

const NewPassword = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    console.log('token:', token)
    const reset = async () => {

        try {
            const res = await fetch('/newPassword', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password, token
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
                    html: "Password has been reset",
                    classes: "green darken-1"
                })
                navigate('/signin')
            }
            console.log(data)
        } catch (err) {
            M.toast({ html: err.message })
        }
    }

    return (
        <div className="my-card">
            <div className="card auth-card input-field">
                <h2 className="brand-logo"> Clynestagram </h2>
                <input type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                <button className="btn waves-effect waves-light blue darken-1" type="submit" name="action" onClick={reset}>
                    Reset Pasword
                </button>
            </div>
        </div>
    )
}

export default NewPassword