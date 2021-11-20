import React, { useState, useEffect } from 'react'

const Home = () => {
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
            setData(posts)
        })();

    }, [])

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