const express = require('express');
const app = express();

app.use(express.json());

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    res.json({ message: "User registered!", username, password });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
