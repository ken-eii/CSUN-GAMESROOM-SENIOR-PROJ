import React, { useEffect, useState } from 'react';
import Axios from 'axios'; // Axios is used for making HTTP requests to a server
import { Link } from 'react-router-dom'; // Link component for navigation without page refresh
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap for styling
import './css/dashboardStyle.css'; // Custom styles specific to the dashboard
import csunGameLogo from './images/csungame.png'; // Importing a logo image

function Dashboard() {
  // State to store device data, initially an object with an empty Devices array
  const [machineData, setMachineData] = useState({ Devices: [] });
  // State to manage the loading status of data fetching
  const [loading, setLoading] = useState(true);
  // State to capture and display errors from the fetch operation
  const [error, setError] = useState(null);
  // Cache duration set to 60 seconds (1 minute)
  const cacheDuration = 60 * 1000;

  useEffect(() => {
    const cache = sessionStorage.getItem('consolesCache');
    const now = new Date();

    if (cache) {
      const { data, timestamp } = JSON.parse(cache);
      const isCacheValid = now.getTime() - timestamp < cacheDuration;

      if (isCacheValid) {
        setMachineData(data);
        setLoading(false);
        return;
      }
    }

    async function fetchData() {
      try {
        const response = await Axios.get('http://localhost:5000/consoles');
        console.log("API Data:", response.data);
        setMachineData(response.data);
        sessionStorage.setItem('consolesCache', JSON.stringify({ data: response.data, timestamp: now.getTime() }));
      } catch (error) {
        console.error("Fetching devices failed", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [cacheDuration]); // Dependency array includes cacheDuration to re-run the effect if it changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data: {error.message}</p>;

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-custom navbar-dark sticky-top shadow-lg">
        {/* Navigation bar with links to different pages and logo */}
        <div className="container-fluid">
          <Link className="navbar-brand mx-5" to="/"><b>CSUN GAMES ROOM</b></Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
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
              <img src={csunGameLogo} alt="CSUN Games Room Logo" className="navbar-image mr-5"/>
            </ul>
          </div>
        </div>
      </nav>
      <div className="row">
      <main className="dashboard col-lg-9">
        <div className="mt-5">
          <h1 className="med-text d-flex justify-content-center"><b>Pool Tables:</b></h1>
          <br />
        </div>
        <div className="row">
          {/* Map over devices filtered by type 'Other' to display pool table data */}
          {machineData.Devices.filter(device => device.Type === "Other").map((device, index) => (
            <div className="col-md-6" key={device.Uuid}>
              <div className="card mb-3">
                <h5 className="card-header">{`Pool Table ${index + 1}`}</h5>
                <div className="card-body">
                  <ul className="list-group list-group-flush" style={{ listStyleType: 'none' }}>
                    <li>User: {device.Name}</li>
                    <li>Type: {device.Type}</li>
                    <li>Uuid: {device.Uuid}</li>
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
