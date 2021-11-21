import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../App'

const UserProfile = () => {
    const { state, dispatch } = useContext(UserContext)
    const [posts, setPosts] = useState([])
    const [userProfile, setUserProfile] = useState(null)
    const { id } = useParams()
    useEffect(() => {
        (async () => {
            const res = await fetch(`/user/${id}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('jwt')
                }
            })
            const resJson = await res.json()
            const { user, posts: newPosts } = resJson
            setUserProfile(user)
            setPosts(newPosts)
        })()
    }, [])
    return (
        <>
            {
                !userProfile ? "Loading" : (
                    <div
                        style={{
                            maxWidth: "550px",
                            margin: "0px auto"
                        }}
                    >
                        <div style={{
                            display: "flex",
                            justifyContent: "space-around",
                            margin: "18px 0px",
                            borderBottom: '1px solid grey'
                        }}>
                            <div>
                                <img
                                    style={{ width: "160px", height: "160px", borderRadius: "80px" }}
                                    src={`https://iv1.lisimg.com/image/23157589/740full-lauren-tsai.jpg`}
                                />
                            </div>
                            <div>
                                <h4> {userProfile ? userProfile.name : 'Loading'}  </h4>
                                <h5> {userProfile ? userProfile.email : 'Loading'}  </h5>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    width: '108%'
                                }}>
                                    <h6>18 post</h6>
                                    <h6>40k followers</h6>
                                    <h6>100 following</h6>
                                </div>
                            </div>
                        </div>
                        <div className="gallery">
                            {
                                posts.map(p => {
                                    return (
                                        <img key={p._id} className="item" src={`${p.photo}`} />
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }

        </>

    )
}

export default UserProfile