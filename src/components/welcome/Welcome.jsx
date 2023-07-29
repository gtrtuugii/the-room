import React from 'react';
import "./welcome.css";
import BackGround from "./bg.jpg"
import { Link } from "react-router-dom";
const Welcome = () => {
  return (
    <div className="welcome">
        <div className="container-fluid">
            <div className="row">
                <div className="col-8" id='welcome'>
                    <div className="typo">
                        <h2>Welcome to the </h2>
                        <h1> Locker Room</h1>
                        <Link to="/intro"><button className='btn'>Learn more</button></Link>
                    </div>
                    

                </div>
                <div className="col-4" id='join'>
                    <img src={BackGround} alt="" />
                    <Link to="/register">
                    <div className="card">
                        <div className="card-body">
                            <h3>Join us</h3>
                        </div>
                    </div>
                    </Link>
                </div>
            </div>
        </div>
    </div>

  )
}

export default Welcome