const express = require("express")
const app = express()
const cors = require("cors")

// defining CORS options to only allow requests this app's frontend origin
const corsOptions = {
    origin: ["http://localhost:5173"]
}

app.use(cors(corsOptions))

// defining health check endpoint to verify server is running
app.get("/health", (req, res) => {
    res.send("This server is running.")
});

// defining API route to fetch restaurant data from the API
app.get("/discovery/uk/restaurants/enriched/bypostcode/EC4M7RF", async (req, res) => {
    try {
        // making request to the Just Eat API
        const response = await fetch("https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/EC4M7RF");
        const data = await response.json(); // parsing JSON response
        res.json(data); // send fetched data as JSON response to client
    } catch (error) {
        console.error("Error fetching data:", error)
        res.status(500).json({error: "Failed to fetch data"}) // return 500 error in case of failure
    }
});

// start the server only if this file is executed directly
if (require.main === module) {
    app.listen(8080, () => console.log("Server started on port 8080"));
}

// export express app instance so it can be imported for testing
module.exports = app;