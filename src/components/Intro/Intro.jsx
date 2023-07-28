import React from 'react';
import { Carousel } from 'react-bootstrap';
import "./intro.css";

const Intro = () => {
  return (
    <div className="intro">
        <div className="container">
            <div className="row">
                <div className="col">
                    <Carousel>
                        <Carousel.Item>
                            Hello World
                            This is a test
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Intro;