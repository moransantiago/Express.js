const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
    res.send('Hello world');
});

const server = app.listen(3000, () => {
    console.log(`Listening http://localhost:${server.address().port}`);
});