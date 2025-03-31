import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const [restaurantData, setRestaurantData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchAPI = async () => {
        try {
            const response = await axios.get("http://localhost:8080/discovery/uk/restaurants/enriched/bypostcode/EC4M7RF")
            setRestaurantData(response.data.restaurants)
            console.log(response.data.restaurants)
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAPI()
    }, []);

    if (isLoading) {
        return <p className="loading-text">Fetching Data...</p>
    }

    return (
        <>
            <header>
                <h1>Top 10 Restaurants</h1>
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
