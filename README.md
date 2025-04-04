# Restaurant Finder for EC4M 7RF

### Description of project:
A web app that fetches and displays the top 10 restaurants based on the postcode: EC4M 7RF. For each retrieved restaurant, the name, address, what cuisines it serves, and the ratings are displayed.

## Project Setup

### Prerequisites:
* Ensure Node.js is installed on your machine
* Install npm (Node Package Manager) along with Node.js
* Ensure that port **8080** (backend) and port **5173** (frontend) are not in use before running the application.
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

## Assumptions and Unclear Aspects

* I have assumed that the API response structure remains consistent for every restaurant. If the structure changes (e.g., missing fields like cuisines or ratings), then additional error handling for this would need to be added.  
* I have assumed that for each restaurant, only the first two cuisines are relevant. Other tags in the cuisines section such as "Low Delivery Fee" or "Deals" are ignored when displaying cuisine information.  
* I have assumed that all restaurant data contains a valid image of the restaurant logo (logoUrl). If this is missing, then the restaurant name is displayed.  
* I have assumed that ports 8080 (for backend) and 5173 (for frontend) are available for use.  

## Future Improvements

* **User-Input**: Allow users to input any postcode and fetch restaurants near that location instead of using a fixed postcode.  
* **Sorting and Filtering Options**: Implement options to sort results by different criteria, such as highest-rated restaurants first, filtering by cuisine type, or displaying restaurants closest to the user.  
* **Dynamic Port Selection**: Instead of using fixed ports (8080 for backend and 5173 for frontend), configure the application to automatically select available ports on the user's machine.  
* **UI and Animation Enhancements**: Improve the UI with animations and visually appealing elements to enhance user engagement.  
* **Dedicated Homepage**: Add a separate homepage where users can enter their postcode before being redirected to the restaurant results page. This would improve the user flow and make the application more interactive.  
* **Additional Testing**: Extend test coverage to include test cases such as missing restaurant details (e.g., no rating, no cuisines, no image) to ensure the application handles these errors properly.  
* **Automated Backend and Frontend Startup**: Find a way to automate starting both the backend and frontend, reducing the need for the user to manually run them separately.