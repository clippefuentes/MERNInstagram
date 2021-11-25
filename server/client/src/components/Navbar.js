import React, { useContext, useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'
import { useNavigate } from 'react-router'
import M from 'materialize-css'

const NavBar = () => {
    const searchModalRef = useRef(null)
    const [searchInput, setSearchInput] = useState('')
    const [users, setUsers] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const navigate = useNavigate()
    const renderList = () => {
        if (state) {
            return [
                <li key="search">
                    <i className="large material-icons modal-trigger"
                        data-target="modal1"
                        style={{ color: 'black' }}
                        onClick={() => { }}
                    >search</i>
                </li>,
                <li key="profile"><Link to="/profile">Profile</Link></li>,
                <li key="newPost"><Link to="/newPost">Create Post</Link></li>,
                <li key="followersPost"><Link to="/followersPost">My Followers Post</Link></li>,
                <li key="logout">
                    <button
                        className="btn waves-effect waves-light red darken-3" type="submit" name="action"
                        onClick={() => {
                            localStorage.clear()
                            dispatch({ type: "CLEAR" })
                            navigate('/login')
                        }}
                    >
                        Logout
                    </button>
                </li>
            ]
        } else {
            return [
                <li key="login"><Link to="/login">Login</Link></li>,
                <li key="signup"><Link to="/signup">Signup</Link></li>
            ]
        }
    }

    useEffect(() => {
        M.Modal.init(searchModalRef.current)
    }, [])

    const fetchUsers = async (query) => {
        setSearchInput(query)
        const res = await fetch('/search', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                query
            })
        })
        const resJson = await res.json()
        const { users } = resJson
        setUsers(users)
        console.log(users)
    }

    return (
        <nav>
            <div className="nav-wrapper white">
                <Link to={state ? "/" : "/login"} className="brand-logo left">Clynestagram</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {
                        renderList()
                    }

                </ul>
            </div>
            <div id="modal1" className="modal" ref={searchModalRef}
                style={{ color: "black" }}
            >
                <div className="modal-content">
                    <input type="email" placeholder="Search User" value={searchInput}
                        onChange={(e) => { fetchUsers(e.target.value) }}
                    />
                    <div className="collection with-header">
                        {
                            users.map((user) => {
                                return (
                                    <li className="collection-item">
                                        <Link 
                                            to={`/profile/${user._id}`}
                                            className="modal-close"
                                        >
                                            {user.email}
                                        </Link>
                                    </li>
                                )
                            })
                        }
                        
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat">Cancel</button>
                </div>
            </div>
        </nav>
    )
}

export default NavBar