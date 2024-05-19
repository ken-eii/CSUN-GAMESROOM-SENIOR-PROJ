import React from 'react';
import { Link } from 'react-router-dom'; // Used for navigation within the SPA (Single Page Application)
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for responsive styling
import './css/indexA.css'; // Custom CSS for additional styling
import './css/indexB.css'; // Additional custom CSS
// Importing images used in the component
import tvStationImage from './images/PUiYqFSTKeUmdKAe6mcWm8.jpg'; // Image for TV stations section
import gamingPcImage from './images/How_to_build_gaming_PC.png'; // Image for gaming PCs section
import poolTableImage from './images/7-smart-ways-to-fit-a-pool-table-into-your-home-693657.webp'; // Image for pool tables section
import csunGameLogo from './images/csungame.png'; // Logo of CSUN Games Room

function Home() {
  return (
    <div className="background">
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
                <Link className="nav-link" to="/contact">Contact Us</Link>
              </li>
              {/* Display logo in the navbar */}
              <li className="nav-item">
                <img src={csunGameLogo} alt="CSUN Games Room Logo" className="navbar-image mr-5"/>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      {/* Welcome message section */}
      <div className='separate'>
        <section>
          <h1>WELCOME TO THE CSUN GAMES ROOM!</h1>
        </section>
      </div>
        
      {/* Main section featuring clickable images leading to different game room activities */}
      <section>
        <h1>Queue Up To Start!</h1>
        <div className="row">
          <div className="col-md-4 text-center mb-3">
            {/* TV Station section */}
            <div className="image-container">
              <img src={tvStationImage} alt="TV Stations" className="img-fluid rounded medium-image"/>
            </div>
            <div className="button-container mt-3">
              <Link to="/consoles" className="btn grn-btn rounded-pill shadow">GAME CONSOLES!</Link>
            </div>
          </div>
          
          <div className="col-md-4 text-center mb-3">
            {/* Gaming PC section */}
            <div className="image-container">
              <img src={gamingPcImage} alt="Gaming PC" className="img-fluid rounded medium-image"/>
            </div>
            <div className="button-container mt-3">
              <Link to="/computers" className="btn grn-btn rounded-pill shadow">COMPUTERS!</Link>
            </div>
          </div>
          
          <div className="col-md-4 text-center mb-3">
            {/* Pool table section */}
            <div className="image-container">
              <img src={poolTableImage} alt="Pool Table" className="img-fluid rounded medium-image"/>
            </div>
            <div className="button-container mt-3">
              <Link to="/poolTables" className="btn grn-btn rounded-pill shadow">POOL!</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
