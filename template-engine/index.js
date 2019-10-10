const express = require('express');
const app = express();
const expressJsx = require('./express-jsx');

app.engine('jsx', expressJsx);
app.set('views', './views');
app.set('view engine', 'jsx');

app.get('/', (req, res) => {
    res.render('index', { hello: 'hola', world: 'mundo' });
});

const server = app.listen(3000, () => {
    console.log(`Listening http://localhost:${server.address().port}`);
});