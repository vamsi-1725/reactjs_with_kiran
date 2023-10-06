import React from 'react';
import { Panel } from 'primereact/panel';
const Home = () => {
    const backgroundImage = {
        imgUrl: "https://tse4.mm.bing.net/th?id=OIP.WChwYt0BxSsXq3XfmenSfAHaFj&pid=Api&P=0&h=180",
    };

    return (
        <div style={{ paddingLeft: "65px", paddingTop: "72px" }} className="card">
            <Panel header="Home">
                <p className="m-0">
                    <div style={{
                        backgroundImage: `url(${backgroundImage.imgUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        width: '90vw',
                        height: '58vh',
                        marginTop: "21px",
                        display: 'flex',
                        marginLeft: "-15px",
                        marginBottom: "100px",
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <p style={{ fontSize: "40px", color: "black" }}>Welcome to the <b>Shopping mall</b></p>
                    </div>
                </p>
            </Panel>
        </div>
    );
}

export default Home;
