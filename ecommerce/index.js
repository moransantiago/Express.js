const express = require('express');
const path = require('path');
const boom = require('boom');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const {
    logErrors,
    wrapErrors,
    clientErrorHandler,
    errorHandler
} = require('./utils/middlewares/errorsHandlers');

const productsRouter = require('./routes/views/products');
const productsApiRouter = require('./routes/api/products');
const authApiRouter = require('./routes/api/auth');
const requestIsAjaxOrApi = require('./utils/requestIsAjaxOrApi')

//  App
const app = express();

//  Middlewares
app.use(helmet());
app.use(bodyParser.json());

//  Static files
app.use('/static', express.static(path.join(__dirname, 'public')));

//  View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//  Routes
app.use('/products', productsRouter);
productsApiRouter(app);
app.use('/api/auth', authApiRouter);

//  Redirect
app.get('/', (req, res) => {
    res.redirect('/products');
});

app.use((req, res, next) => {
    if (requestIsAjaxOrApi(req)) {
        const {
            output: { statusCode, payload }
        } = boom.notFound();

        res.status(statusCode).json(payload);
    }

    res.status(404).render('404');
});

//  Error handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

//  Server
const server = app.listen(3000, () => {
    console.log(`Listening http://localhost:${server.address().port}`);
});