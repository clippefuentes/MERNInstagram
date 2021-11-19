import React from 'react'

const Profile = () => {
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
                    <h4> Lauren Tsai </h4>
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
                <img className="item" src={`https://iv1.lisimg.com/image/23140998/740full-lauren-tsai.jpg`} />
                <img className="item" src={`https://iv1.lisimg.com/image/23140998/740full-lauren-tsai.jpg`} />
                <img className="item" src={`https://iv1.lisimg.com/image/23140998/740full-lauren-tsai.jpg`} />
                <img className="item" src={`https://iv1.lisimg.com/image/23140998/740full-lauren-tsai.jpg`} />
                <img className="item" src={`https://iv1.lisimg.com/image/23140998/740full-lauren-tsai.jpg`} />
                <img className="item" src={`https://iv1.lisimg.com/image/23140998/740full-lauren-tsai.jpg`} />
            </div>
        </div>
    )
}

export default Profile