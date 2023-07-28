import React from 'react';
import "./about.css";
// Images
import PhoneCallDark from "./images/CV/phone-call-dark.png";
import EnvelopeDark from "./images/CV/envelope-dark.png";
import MarkerDark from "./images/CV/marker-dark.png";
import CalenderDark from "./images/CV/calendar-dark.png";
import GraduationCapDark from "./images/CV/graduation-cap-dark.png";
import Headshot from "./images/CV/headshot.png";
const About = () => {
  return (
    <div className="about">
        <div id="main-content" className="container-fluid">
            <div className="row content">
            <div id="navside" className="col-sm-3 sidenav">
                <img id='headshot' src={Headshot} alt='author-img' />
                <h4>Tuguldur Gantumur</h4>
                <hr/>
                <ul id="personal-info" className="list-group list-group-pills list-group-stacked">
                    <li className="list-group-item">
                        <img src={PhoneCallDark} height="25" className="d-inline-block align-top" alt="phone-img"/>
                        <span> 0415445737</span>
                    </li>
                    <li className="list-group-item">
                        <img src={EnvelopeDark} height="25" className="d-inline-block align-top" alt="email-img"/>
                        <span> gtrtuugii@gmail.com</span>
                    </li>
                    <li className="list-group-item">
                        <img src={MarkerDark} height="25" className="d-inline-block align-top" alt="pin-img"/>
                        <span> Australia</span>
                    </li>
                    <li className="list-group-item">
                        <img src={CalenderDark} height="25" className="d-inline-block align-top" alt="phone-img"/>
                        <span> 01/04/1999 </span>
                    </li>
                    <li className="list-group-item">
                        <img src={GraduationCapDark} height="25" className="d-inline-block align-top" alt="phone-img"/>
                        <span> Bachelor of Science, Computer Science</span>
                    </li>
                </ul><br/>
                <h4 id='skills'>Skills</h4>
                <hr/>
                <ul id='skillset'>
                    <li>
                       <span>Proefficient programming languages:</span>
                       <ul>
                        <li>Python</li>
                        <li>Java</li>
                        <li>Javscript</li>
                        <li>C</li>
                        <li>C#</li>
                       </ul>
                    </li>
                    <li>
                        <span> Object Oriented Programming (Java, Python)</span>
                    </li>
                    <li>
                        <span>Front-end development</span>
                        <ul>
                            <li>HTML, CSS, JS</li>
                            <li>React.js</li>
                        </ul>
                    </li>
                    <li>
                        <span>Back-end development</span>
                        <ul>
                            <li>Firebase</li>
                            <li>node.js</li>
                            <li>express</li>
                            <li>django</li>
                            <li>SQLite3</li>
                            <li>MySQL</li>
                        </ul>
                    </li>

                </ul>

        </div>

        <div id="CV" className="col-sm-3">
            <br />
            <h2><strong>Curriculum Vitae</strong></h2>
            <hr/>
            <h3>About Me</h3>
            <h5><span className="glyphicon glyphicon-time"></span></h5>
            <br/>
            <p> 
                A highly motivated and dedicated software engineer, I possess exceptional perseverance and a strong work ethic. 
                I am committed to delivering high-quality work and thrive under challenging deadlines. 
                My friendly and cooperative nature allows me to collaborate effectively with colleagues and clients alike. 
                I am adept at problem-solving and enjoy working in a dynamic and fast-paced environment. 
                With a passion for learning and staying up-to-date with the latest technologies, 
                I am constantly seeking new challenges and opportunities to grow as a professional.
            </p>
            <br></br>

            <h2 >Education</h2>
            <hr/>

            <h3>National University of Mongolia</h3>
            <h4>Diploma of Economics</h4>
            <p className="border-bottom">2016-2017</p>
            
            <h3>University of Bristol</h3>
            <h4>Foundation Programme of Economics</h4>
            <p className="border-bottom">2017-2018</p>
            <h3>University of Western Australia</h3>
            <a href="https://year2019.handbooks.uwa.edu.au/majordetails?code=MJD-CMPSC#dsmlevel3">
                <h4>Bachelor of Science, Computer Science</h4>
            </a>
            <h5> Second major in Economics</h5>
            <p className="border-bottom">2019-2023</p>
            <br></br>

            
            <br/>

            <h2>Extra-Curricular Activities</h2>
            <hr/>
            <h3>UniMentor</h3>
            <p>A UniMentor is a later year student from the same faculty who wants
                to help a commencing student navigate the everyday challenges
                of University Life by drawing on his or her greater knowledge and
                experience and assist their transition
            </p>
            <br></br>
            <h2>Certificates</h2>
            <hr/>
            <h3>Deloitte</h3>
            <h5>Technology Virtual Experience Program</h5>
            <p>Graduation Date: Jul 2023</p>
            <br />
            <h3>Practera</h3>
            <h5>Business Opportunity Accelerator Completer</h5>
            <p>Graduation Date: Feb 2023</p>
            <hr />


        </div>
        <div className="col-sm-3">
        <h2>Work Experience</h2>
        <hr/>
            <h3>Intern, Back-End Engineer, Alvo LLC</h3>
            <p>2021.Nov-2022.Jan</p>
            <p>Served as a dedicated and supportive Intern in a fast-paced
                environment. Was able to be mentored in the back-end side of the
                company, where I was able to learn more about:
                <ol>
                    <li>Spring boot</li>
                        <ul>
                            <li>Micro service architecture    </li>
                        </ul>
                    <li>REST API</li>
                        <ul>
                            <li>MVC Architecture</li>
                            <li>Maven Project</li>
                            <li>Project lombok</li>
                            <li>Exception handling and security testing</li>
                            <li>Spring testing</li>
                        </ul>
                    <li>Working with databases</li>
                        <ul>
                            <li>MongoDB</li>
                            <li>Google Cloud</li>
                        </ul>
                </ol>
            </p>
            <br></br>

            <h2>Relevant Coursework</h2>
            <hr/>
            <ul id="courses" className="list-group list-group-pills list-group-stacked">
                <li className="list-group-item">
                    <a href="https://year2019.handbooks.uwa.edu.au/unitdetails?code=CITS1001">CITS1001 Software Engineering with Java</a>
                </li>  
                <li className="list-group-item">
                    <a href="https://year2019.handbooks.uwa.edu.au/unitdetails?code=CITS1402">CITS1402 Relational Database Management Systems</a>
                </li>
                <li className="list-group-item">
                    <a href="https://year2019.handbooks.uwa.edu.au/unitdetails?code=CITS2002">CITS2002 Systems Programming</a>
                </li>
                <li className="list-group-item">
                    <a href="https://year2019.handbooks.uwa.edu.au/unitdetails?code=CITS2200">CITS2200 Data Structures and Algorithms</a>
                </li>
                <li className="list-group-item">
                    <a href="https://year2019.handbooks.uwa.edu.au/unitdetails?code=CITS2211">CITS2211 Discrete Structures</a>
                </li>
                <li className="list-group-item">
                    <a href="https://year2019.handbooks.uwa.edu.au/unitdetails?code=CITS2401">CITS2401 Computer Analysis and Visualisation</a>
                </li>
                <li className="list-group-item">
                    <a href="https://year2019.handbooks.uwa.edu.au/unitdetails?code=CITS3002">CITS3002 Computer Networks</a>
                </li>
                <li className="list-group-item">
                    <a href="https://year2019.handbooks.uwa.edu.au/unitdetails?code=CITS3003">CITS3003 Graphics and Animation</a>
                </li>
                <li className="list-group-item">
                    <a href="https://handbooks.uwa.edu.au/unitdetails?code=CITS3001">CITS3001 Algorithms, Agents & Artificial Intelligence</a>
                </li>
                <li className="list-group-item">
                    <a href="https://handbooks.uwa.edu.au/unitdetails?code=CITS3007">CITS3007 Secure Coding</a>
                </li>
                <li className="list-group-item">
                    <a href="https://handbooks.uwa.edu.au/unitdetails?code=CITS3200">CITS3200 Professional Computing</a>
                </li>
            </ul>
            <hr/>
        </div>
        <div id="proj" className="col-sm-3">
            <h2> <strong>Professional Portfolio Project</strong></h2>
            <hr/>
            <h4> CITS3200 Professional Computing</h4>
            <h5> Project Overview</h5>
            <p>
                Every day, the Ridgefield farm receives a large number of visitors. It is important that they have
                completed the induction process and keep track of their arrival and departure times in real time. The farm
                manager is not always on site, so it is important that the facility's emergency personnel are aware of who
                is there.
                To ensure that visitors are aware of their surroundings and are able to provide the necessary information,
                they should scan a QR Code and provide the farm's staff with a detailed description of their visit. This
                information will then be sent to an app on the farm's manager's phone. This will allow the staff to keep
                track of the number of people who visit the facility and the activities that they participate in. In addition to
                being helpful in providing safety, the data collected by this system will also be used to report on the
                activities of the farm annually.
            </p>
            <h5> Proposed System:</h5>
            <p>
                The system should be easy to navigate and securely store user information. When users (visitors)
                enter a site on the premises they should be able to easily check-in and provide details such as:
                destinations, estimated duration of stay, access farm rules if applicable. In addition users should
                also be able to check-out and the system should automatically store the time of exit and the
                amount of time the user has visited the premises. Therefore, the system should store both the
                point of time of entry and exit and compare it with the estimated time of stay the user provided at
                the beginning for confirmation purposes. The site manager should be able to see who is on the
                site and which locations they will be visiting, their estimated duration of stay, and contact details
                (under necessary circumstances), and receive live notifications upon a visitor entering a site. The
                system should also be able to store data and provide analytics for the requested period of time.
            </p>
            <a href="https://csb-rdxfbp.netlify.app/"> Link to hosted project.</a> 
            <hr/>
        </div>
    </div>
    </div>
    </div>

  )
}

export default About