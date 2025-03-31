# Restaurant Finder for EC4M 7RF

### Description of project:
A web app that fetches and displays the top 10 restaurants based on the postcode: EC4M 7RF. For each retrieved restaurant, the name, address, what cuisines it serves, and the ratings are displayed.

## Project Setup

### Prerequisites:
* Ensure Node.js is installed on your machine
* Install npm (Node Package Manager) along with Node.js
* Ensure that port **8080** (backend) and port **5173** are not in use before running the application.
* If these ports are occupied, please stop any processes using them.

## Running the project

1. Clone the repository  
   ```git clone https://github.com/sabahbaig31/JETCodingAssignment2025.git ```
2. Navigate to the backend (server) folder and install the dependencies for the backend by running this command   
    ````cd JETCodingAssignment2025/restaurant-data-server````  
    ````npm install````
3. Navigate to the frontend (client) folder and install the dependencies for the frontend by running this command  
   ````cd JETCodingAssignment2025/restaurant-data-client````  
   ````npm install````
4. Navigate to the restaurant-data-server folder and start the backend server  
   ````cd ../restaurant-data-server````  
    ````npm start````  
    This will start the backend on the specified port (**localhost:8080**)
5. Navigate to the restaurant-data-client folder and start the frontend server  
    ````cd ../restaurant-data-client````  
    ````npm start````  
    This will start the frontend server at **localhost:5173**  
6. Once the backend and frontend are both running, you can access the web application by navigating to **http://localhost:5173** in your browser.  

