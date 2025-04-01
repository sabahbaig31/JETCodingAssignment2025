import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const [restaurantData, setRestaurantData] = useState([]) // Store restaurant data
    const [isLoading, setIsLoading] = useState(true) // Store loading state

    const fetchAPI = async () => {
        try {
            const response = await axios.get("http://localhost:8080/discovery/uk/restaurants/enriched/bypostcode/EC4M7RF")
            setRestaurantData(response.data.restaurants) // Update with retrieved data
            console.log(response.data.restaurants)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false) // App is no longer in loading state
        }
    }

    // Fetch data when the component mounts
    useEffect(() => {
        fetchAPI()
    }, []);

    // Display loading screen while data is being fetched
    if (isLoading) {
        return <p className="loading-text">Fetching Data...</p>
    }

    // Display first 10 restaurants' data on the webpage
    return (
        <>
            <header>
                <h1>Top 10 Restaurants for EC4M 7RF</h1>
            </header>
            <div className="restaurant-container">
            {
                restaurantData.slice(0,10).map((restaurant) => (
                    <div key={restaurant.id} data-testid={'restaurant-item'} className="restaurant-card">
                        <div className="restaurant-logo">
                            <img src={restaurant.logoUrl} alt={restaurant.name} />
                        </div>
                        <div className="restaurant-info">
                            <p>{restaurant.name}</p>
                            <p>{restaurant.address.firstLine}, {restaurant.address.postalCode}</p>
                            <p>Cuisines: {restaurant.cuisines[0].name}, {restaurant.cuisines[1].name}</p>
                            <p>Rating: {restaurant.rating.starRating}</p>
                        </div>
                    </div>
                ))
            }
            </div>
        </>
    )
}

export default App
