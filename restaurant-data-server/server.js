const express = require("express")
const app = express()
const cors = require("cors")

const corsOptions = {
    origin: ["http://localhost:5173"]
}

app.use(cors(corsOptions))

app.get("/health", (req, res) => {
    res.send("This server is running.")
});

app.get("/discovery/uk/restaurants/enriched/bypostcode/EC4M7RF", async (req, res) => {
    const response = await fetch("https://uk.api.just-eat.io/discovery/uk/restaurants/enriched/bypostcode/EC4M7RF");
    const data = await response.json();
    res.json(data);
});

if (require.main === module) {
    app.listen(8080, () => console.log("Server started on port 8080"));
}

module.exports = app;