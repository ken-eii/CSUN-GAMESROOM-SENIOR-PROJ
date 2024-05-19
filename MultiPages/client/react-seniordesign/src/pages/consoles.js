import React, { useEffect, useState } from 'react';
import Axios from 'axios'; // Axios for making HTTP requests
import { Link } from 'react-router-dom'; // Link component for navigation within the SPA without page refresh
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap for styling
import './css/dashboardStyle.css'; // Custom CSS for the dashboard
import csunGameLogo from './images/csungame.png'; // Logo image for the CSUN Games Room

function Dashboard() {
  const [machineData, setMachineData] = useState({ Devices: [] }); // State to hold the machine data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to hold any error during fetching
  const cacheDuration = 60 * 1000; // Cache expiration set to 1 minute

  useEffect(() => {
    const cacheKey = 'consolesCache'; // Key used to store cache in sessionStorage
    const cache = sessionStorage.getItem(cacheKey); // Retrieve cache from sessionStorage
    const now = new Date();

    if (cache) {
      const { data, timestamp } = JSON.parse(cache);
      const isCacheValid = now.getTime() - timestamp < cacheDuration;

      if (isCacheValid) {
        setMachineData(data); // Use cached data if valid
        setLoading(false);
        return;
      }
    }

    // Function to fetch data from the API
    async function fetchData() {
      try {
        const response = await Axios.get('http://localhost:5000/consoles');
        console.log("API Data:", response.data); // Log the fetched data
        setMachineData(response.data); // Update state with the new data
        sessionStorage.setItem(cacheKey, JSON.stringify({ data: response.data, timestamp: now.getTime() })); // Update cache with new data
      } catch (error) {
        console.error("Fetching devices failed", error); // Log error if fetch fails
        setError(error); // Set error state
      } finally {
        setLoading(false); // Ensure loading is set to false after fetch attempt
      }
    }
    fetchData();
  }, [cacheDuration]); // Depend on cacheDuration to re-run effect when it changes

  if (loading) return <p>Loading...</p>; // Display while data is loading
  if (error) return <p>Error loading data: {error.message}</p>; // Display in case of an error

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-custom navbar-dark sticky-top shadow-lg">
        <div className="container-fluid">
          <Link className="navbar-brand mx-5" to="/"><b>CSUN GAMES ROOM</b></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              {/* Navigation links to other pages */}
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
            <h1 className="med-text d-flex justify-content-center"><b>Dashboard:</b></h1>
            <br />
          </div>
          <div className="row">
            {/* Process and display machine data */}
            {Object.values(machineData.Devices
              .filter(device => device.Type !== "Other") // Filter out devices of type 'Other'
              .reduce((acc, device) => {
                if (!acc[device.Type]) {
                  acc[device.Type] = [];
                }
                acc[device.Type].push(device);
                return acc;
              }, {}))
              .flatMap(deviceArray => {
                deviceArray.sort((a, b) => a.Uuid.localeCompare(b.Uuid)); // Sort devices by Uuid
                let counter = 0; // Counter to display device number
                return deviceArray.map((device, index) => (
                  <div className="col-md-6" key={device.id}>
                    <div className="card mb-3">
                      <h5 className="card-header">{`${device.Type} #${++counter}`}</h5>
                      <div className="card-body">
                        <ul className="list-group list-group-flush" style={{ listStyleType: 'none' }}>
                          <li>Status: {device.Name}</li>
                          <li>Type: {device.Type}</li>
                          <li>Uuid: {device.Uuid}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                ));
              })
            }
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
