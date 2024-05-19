import React, { useEffect, useState } from 'react';
import Axios from 'axios'; // Axios is used for making HTTP requests
import { Link } from 'react-router-dom'; // Link component for navigation within the app without refreshing the page
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for responsive layout and styling
import './css/dashboardStyle.css'; // Custom CSS for dashboard-specific styles
import csunGameLogo from './images/csungame.png'; // Logo image for the CSUN Games Room

// Helper function to format dates consistently
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function Dashboard() {
  const [machines, setMachines] = useState([]); // State for storing machine data
  const cacheDuration = 60 * 1000; // Cache duration set to 1 minute in milliseconds

  useEffect(() => {
    const cache = sessionStorage.getItem('machinesCache');
    const now = new Date();

    if (cache) {
      const { data, timestamp } = JSON.parse(cache);
      const isCacheValid = now.getTime() - timestamp < cacheDuration;

      if (isCacheValid) {
        setMachines(data); // Use cached data if it's still valid
        return;
      }
    }

    // Function to fetch machines data from the server
    const fetchMachines = async () => {
      try {
        const response = await Axios.get('http://localhost:5000/machines');
        const sortedMachines = response.data.Machines.sort((a, b) => a.Name.localeCompare(b.Name));
        setMachines(sortedMachines); // Set fetched and sorted machines to state
        sessionStorage.setItem('machinesCache', JSON.stringify({ data: sortedMachines, timestamp: now.getTime() })); // Cache the fetched data
      } catch (error) {
        console.error("Failed to fetch machines:", error);
      }
    };

    fetchMachines();
  }, [cacheDuration]); // Dependency array includes cacheDuration to re-fetch when it changes

  return (
    <div className="container-fluid">
      {/* Navigation bar setup using Bootstrap for consistent styling */}
      <nav className="navbar navbar-expand-lg navbar-custom navbar-dark sticky-top shadow-lg">
        <div className="container-fluid">
          <Link className="navbar-brand mx-5" to="/"><b>CSUN GAMES ROOM</b></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              {/* Links to other pages of the application */}
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
              <img src={csunGameLogo} alt="CSUN Games Room Logo" className="navbar-image mr-5"/>
            </ul>
          </div>
        </div>
      </nav>

      <div className="row">
        <main className="dashboard col-lg-9">
          <div className="mt-5">
            <h1 className="med-text d-flex justify-content-center"><b>Computers!</b></h1>
            <br />
          </div>
          <div className="row">
            {/* Display each machine's data in a card */}
            {machines.map((machine) => (
              <div className="col-md-6" key={machine.Uuid}>
                <div className="card mb-3">
                  <h5 className="card-header">{machine.Name}</h5>
                  <div className="card-body">
                    <ul className="list-group list-group-flush" style={{ listStyleType: 'none' }}>
                      <li>State: {machine.State}</li>
                      <li>Last Update: {formatDate(machine.LastUpdate)}</li>
                      <li>Last State Update: {formatDate(machine.LastStateUpdate)}</li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
