const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();


// Define the API URL and initialize JWT token variable
const apiUrl = 'https://api.ggleap.com/beta/authorization/public-api/auth';
let jwtToken = '';

// Data to be sent in the POST request
const postData = {
  AuthToken: process.env.API_KEY
};

// Headers for the POST request
const headers = {
  'Content-Type': 'application/json-patch+json'
};

// Function to make the POST request and update jwtToken
async function updateJwtToken() {
  try {
    // Make a POST request to apiUrl
    const response = await axios.post(apiUrl, postData, { headers });
    jwtToken = response.data;
    //console.log('JWT token acquired:', jwtToken);
  } catch (error) {
    console.error('Error making POST request:', error.message);
    throw error;
  }
}

// Set up an endpoint for checking session status
app.get('/sessionStatus', async (req, res) => {
  try {
    await updateJwtToken();
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send({ jwtToken: jwtToken });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Function to fetch machines
async function fetchMachines() {
  try {
    await updateJwtToken(); // Ensure JWT token is up-to-date
    const options = {
      method: 'GET',
      url: 'https://api.ggleap.com/beta/machines/get-all',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken.Jwt}`
      }
    };

    // Fetching data from the API
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Function to fetch consoles
async function fetchConsoles() {
  try {
    await updateJwtToken(); // Ensure JWT token is up-to-date
    const options = {
      method: 'GET',
      url: 'https://api.ggleap.com/beta/consoles/get-all',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken.Jwt}`
      }
    };

    // Fetching data from the API
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Set up an endpoint for fetching all machines
app.get('/machines', async (req, res) => {
  try {
    const data = await fetchMachines();
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Set up an endpoint for fetching all consoles
app.get('/consoles', async (req, res) => {
  try {
    const data = await fetchConsoles();
    res.header("Access-Control-Allow-Origin", "*");
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server Started on port 5000');
});
