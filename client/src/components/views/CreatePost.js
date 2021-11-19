import React from 'react'

const CreatePost = () => {
    return (
        <div className="card input-div"
            style={{
                margin: "10px auto",
                maxWidth: "500px",
                padding: "20px",
                textAlign: "center"
            }}
        >
            <input type="text" placeholder="Title " />
            <input type="text" placeholder="Caption " /><div class="file-field input-field">
                <div className="btn">
                    <span>Upload Image</span>
                    <input type="file" />
                </div>
                <div class="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light blue darken-1" type="submit" name="action">
                Create Post
            </button>
        </div>
    )
}

export default CreatePost