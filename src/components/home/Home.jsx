import React from 'react';
import { Carousel } from 'react-bootstrap';
import "./home.css";

const Home = () => {
  return (
    <div className="home-page">
        <div className="container">
            <div className="row">
                <div className="col">
                    <Carousel>
                        <Carousel.Item>
                            Hello World
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home;