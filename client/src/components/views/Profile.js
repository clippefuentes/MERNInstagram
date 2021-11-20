import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'

const Profile = () => {
    const { state, dispatch } = useContext(UserContext )
    const [posts, setPosts] = useState([])
    useEffect(() => {
        (async () => {
            const res = await fetch('/myPosts', {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('jwt')
                }
            })
            const resJson = await res.json()
            const myPosts = resJson.posts
            console.log('myPosts:', myPosts)
            setPosts(myPosts)
        })()
    }, [])
    return (
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
                    <h4> {state ? state.name : 'Loading' }  </h4>
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

export default Profile