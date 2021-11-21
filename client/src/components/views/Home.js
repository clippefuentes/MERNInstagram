import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../App'

const Home = () => {
    const { state, dispatch } = useContext(UserContext)
    const [data, setData] = useState([])

    useEffect(() => {
        (async () => {
            const res = await fetch('/allPosts', {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem('jwt')
                }
            })
            const resJson = await res.json()
            const posts = resJson.posts
            console.log('posts:', posts)
            setData(posts)
        })();

    }, [])

    const likePost = async (item) => {
        const res = await fetch('/like', {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId: item._id
            })
        })
        const resJson = await res.json()
        const post = resJson.post
        const newData = data.map(item => {
            if (item._id == post._id) {
                return post
            } else {
                return item
            }
        })
        setData(newData)
    }


    const unlikePost = async (item) => {
        const res = await fetch('/unlike', {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                postId: item._id
            })
        })
        const resJson = await res.json()
        const post = resJson.post
        const newData = data.map(item => {
            if (item._id == post._id) {
                return post
            } else {
                return item
            }
        })
        setData(newData)
    }
    return (
        <div className="home">
            {
                data.map((item) => {
                    return (
                        <div key={item._id} className="card home-card">
                            <h5>{item.postedBy.name}</h5>
                            <div className="card-image">
                                <img src={`${item.photo}`} />
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{ color: 'black' }}>favorite</i>
                                {
                                    
                                }
                                {
                                    item.likes.includes(state._id) ? (
                                        <i className="material-icons"
                                            style={{ color: 'black' }}
                                            onClick={() => { unlikePost(item) }}
                                        >thumb_down</i>
                                    ) : (

                                        <i className="material-icons"
                                            style={{ color: 'black' }}
                                            onClick={() => { likePost(item) }}
                                        >thumb_up</i>
                                    )
                                }

                                <h6>{item.likes ? item.likes.length : 0} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.caption}</p>
                                <input type="text" placeholder="Add a comment" />
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Home