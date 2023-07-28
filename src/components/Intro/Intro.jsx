import React from 'react';
import { Carousel } from 'react-bootstrap';
import "./intro.css";
import { Link } from "react-router-dom";
const Intro = () => {
  return (
    <div className="intro">
        <div className="container-fluid">
            <div className="row" id="top-row">
                <div className="col-sm-2">
                    <div className="card" id='features'>
                        <div className="card-header">
                            <h6>New features</h6>
                        </div>
                        <div className="card-body">
                            <div className="card"><span>The story book - Media sharing with people that matter </span></div>
                            <div className="card"><span>Le Qubé - messaging system introduced </span></div>
                            <div className="card"><span>We went live! </span></div>
                        </div>
                    </div>
                </div>
                <div className="col-md-9">
                    <Carousel id="carousal" slide={false} fade={true} interval={10000} controls={false} keyboard={true} touch={true}>
                        <Carousel.Item >
                            <div className="card" id='main-card'>
                                <div className="card-header"> <h6>Welcome to</h6></div>
                                <div className="card-body">
                                    <h1>The Room.</h1>
                                    <h5>We believe in the beauty of <strong>authenticity</strong>. </h5>
                                    <p>Forge meaningful relationships with real people, all connecting with each other from behind the mask of anonymity. 
                                        Experience the joy of genuine interactions, where judgments based on appearances and identity are left at the door.</p>
                                </div>
                                <div className="card-footer">
                                    <Link to="/register"><button title="Better late than never.">Join us</button> </Link>
                                </div>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="card">
                                <div className="card-header">
                                    <h6>Ready to connect?</h6>
                                </div>
                                <div className="card-body">
                                    <h1>Le Qubé</h1>
                                    <h5>We believe in real <strong>connections</strong>. </h5>
                                    <p>
                                    Explore a world of anonymous interactions, where you can engage in chat conversations without revealing your true identity. Share your thoughts, ideas, and experiences openly, knowing that your anonymity is safeguarded.
                                    </p>
                                </div>
                                <div className="card-footer">
                                <Link to="/register" title="Better late than never."><button>Join us</button> </Link>
                                </div>
                            </div>
                        </Carousel.Item>

                        <Carousel.Item>
                            <div className="card">
                                <div className="card-header">
                                    <h6>Narrate your story without judgement</h6>
                                </div>
                                <div className="card-body">
                                    <h1>Storybook</h1>
                                    <h5>We believe in <strong>you</strong>. </h5>
                                    <p>"The Room" boasts an exceptional post system, The Storybook, that lets you share captivating media with the world. Express your creativity through memes, images, videos, and other forms of media while keeping your identity under wraps.</p>
                                </div>
                                <div className="card-footer">
                                    <Link to="/register"><button title="Better late than never.">Join us</button> </Link>
                                </div>
                            </div>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="col" id='todo' title="You found me."></div>
            </div>
            <div className="row" id='bot-row'>
                <div className="col-sm-4">
                    <div className="card" id="learn-more">
                        <div className="card-header">
                            <h5>Want to Learn more about the locker room?</h5>
                        </div>
                        <div className="card-body">
                            <span>                        
                            Embrace the thrill of anonymity, unleash your creativity, and embark on a journey of meaningful connections at "The Room." Join us today and step into a world where your identity remains a beautiful mystery, and your ideas speak for themselves. Welcome to "The Room" – where authentici connections come alive!
                            </span>
                        </div>
                        <div className="card-footer">
                            <button className='btn disabled'>Learn more</button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card" id="creator">
                        <div className="card-header">
                            <h5>About the Creator</h5>
                        </div>
                        <div className="card-body">
                            <h7>
                                Toby G.
                            </h7>
                            <p>
                                Software developer based in Australia, seeking knowledge and skills to make the world a better place.
                            </p>
                        </div>
                        <div className="card-footer">
                            <Link to="/about" ><button className="btn" title="Don't judge, I made this in 2020 :') ">Learn More</button></Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Intro;