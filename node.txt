const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, "dist")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, (error) => {
    if (error) {
        console.log("Error: " + error.toString());
    }
    else {
        console.log("Server started at http://localhost:3000/\n");
    }
});