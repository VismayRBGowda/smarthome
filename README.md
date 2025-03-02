# Smart Home Energy Monitoring Dashboard

## Project Idea

This is a user-friendly dashboard for monitoring and tracking energy consumption in a smart home. The dashboard provides real-time insights into energy usage for different rooms and appliances, helping users understand their consumption patterns and identify opportunities for saving energy.

## Workflow

The project involves the following key components and processes:

### 1. Data Acquisition
* Created a databse 'Smarthome' and created a collection 'energydata'.
* Added the csv file present inside backend folder into energydata collection.
* Used socket io to transmit the data one bt one simulating real time updation of data.

### 2. Data Processing

* The server processes the raw energy data, aggregating it by room, appliance, and time period.
* The processed data is also stored in a 'historydatas' collection for historical data visualisation.

### 3. Dashboard Visualization

* A web-based dashboard is developed using React and ChartJS to visualize the energy data.
* The dashboard includes charts of various parts of the house.
* Set the threshold to 10kW and when total energy crosses the threshold used toastContainer to send notification.
* It also fetches the user location and provides weather information.


## Technologies Used

* React
* Chart.js
* socket.io
* Node.js
* ExpressJS
* Database (MongoDB)

## Features

* Real-time energy monitoring
* Historical energy consumption data
* Room-wise and appliance-wise breakdown of energy usage
* Notifications and alerts
* Weather integration

