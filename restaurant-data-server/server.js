const express = require("express")
const app = express()

app.get("/health", (req, res) => {
    res.send("This server is running.")
});

if (require.main === module) {
    app.listen(8080, () => console.log("Server started on port 8080"));
}

module.exports = app;