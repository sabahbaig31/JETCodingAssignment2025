import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";

function App() {

    const [restaurantData, setRestaurantData] = useState([])

    const fetchAPI = async () => {
        try {
            const response = await axios.get("http://localhost:8080/discovery/uk/restaurants/enriched/bypostcode/EC4M7RF")
            setRestaurantData(response.data.restaurants)
            console.log(response.data.restaurants)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchAPI()
    }, []);

  return (
    <>
      <h1>Top 10 Restaurants</h1>
        {
            restaurantData.map((restaurant) => (
                <div key={restaurant.id}>
                    <p>{restaurant.name}</p>
                    <p>Cuisines: {restaurant.cuisines[0].name}, {restaurant.cuisines[1].name}</p>
                </div>
            ))
        }
    </>
  )
}

export default App
