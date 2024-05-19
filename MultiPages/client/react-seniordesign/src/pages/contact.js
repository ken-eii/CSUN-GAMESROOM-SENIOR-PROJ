import React from 'react';
import { Link } from 'react-router-dom'; // Used for navigation within the SPA (Single Page Application)
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for responsive styling
import './css/dashboardStyle.css'; // Main dashboard CSS
import './css/newS.css'; // Additional styling CSS
import csunGameLogo from './images/csungame.png'; // Logo image
import avatarKenny from './images/AvatarKenny.png'; // Image for Kenny
import avatarMichael from './images/AvatarMichael.png'; // Image for Michael
import avatarRita from './images/AvatarRita.png'; // Image for Rita
import avatarJordan from './images/AvatarJordan.png'; // Image for Jordan

function ContactUs() {
  return (
    <>
      {/* Navigation bar setup using Bootstrap classes for styling and responsiveness */}
      <nav className="navbar navbar-expand-lg navbar-custom navbar-dark sticky-top shadow-lg">
        <div className="container-fluid">
          {/* Home link that also serves as the logo and branding for the site */}
          <Link className="navbar-brand mx-5" to="/"><b>CSUN GAMES ROOM</b></Link>
          {/* Responsive navbar toggler for smaller screens */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Collapsible navbar links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item mx-3">
                <Link className="nav-link active" to="/">Home</Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link" to="/computers">Computers</Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link" to="/poolTables">Pool Tables</Link>
              </li>
              <li className='nav-item mx-3'>
                <Link className='nav-link' to="/consoles">Game Consoles</Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link" to="/contact">Contact Us</Link>
              </li>
            </ul>
            {/* Display logo in the navbar */}
            <img src={csunGameLogo} alt="CSUN Games Room Logo" className="navbar-image mr-5"/>
          </div>
        </div>
      </nav>
      
      {/* About section providing a backstory or context about the CSUN Games Room */}
      <div className="about">
        <h2>By CSUN students for CSUN students</h2>
        <p>Our journey began with a frustrating experience – co-founder Ken Simon's overcrowded trip to the USU. It was then that the spark ignited, the realization that there had to be a better way. Inspired by this inconvenience, Ken envisioned an appointment system for the USU, one that would streamline access and ease the burden of overcrowding. Drawing from his own experiences and insights gained while working for CSUN, co-founder Jordan contributed invaluable perspectives, potentially transforming this vision into reality.</p>
        <p>With the collaborative efforts of co-founders Rita and Mikey, our team is committed to ensuring that every student maximizes the potential of the USU games room. Together, we strive to create a solution that not only addresses the challenges we face as CSUN students but also enhances our campus experience. Let's make accessing the USU a seamless and enjoyable experience for all!</p>
      </div>

      {/* Contact section with cards for each team member */}
      <div className="container mt-5">
        <div className="pgtitle1 text-center">
          <h1>Contact Us</h1>  
        </div>
        <div className="section">
          {/* Mapping through avatars and generating contact cards dynamically */}
          {[avatarKenny, avatarMichael, avatarRita, avatarJordan].map((avatar, index) => (
            <div key={index} className="container">
              <div className="card">
                <div className="content">
                  <div className="imgBx">
                    <img src={avatar} alt={`Avatar ${index}`} />
                  </div>
                  <div className="contentBx">
                    <h3>{['Kenny Simon', 'Michael Peters', 'Rita Simon', 'Jordan Mendoza'][index]}</h3>
                  </div>
                </div>
                <div className="sci">
                  <button type="button" className="contact-btn">
                    {/* Mailto links dynamically generated for each team member */}
                    <Link to={`mailto:${['kenny.simon.488', 'michael.peters.123', 'rita.simon.4', 'ralphjordan.mendoza.899'][index]}@my.csun.edu`}>Contact</Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ContactUs;
