const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const flash = require('flash');
const db = require("./config/mongoose-connection");
// const morgan = require('morgan');
// app.use(morgan('dev'));

const indexRouter = require('./routers/index');
const ownersRouter = require('./routers/ownersRouter');
const usersRouter = require('./routers/usersRouter');
const productsRouter = require('./routers/productsRouter');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET || 'default-secret',
        cookie: { secure: false },
    })
);

app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Ensure this matches your project structure

app.use('/', indexRouter);
app.use('/owners', ownersRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
// app.use('/placedetails', usersRouter);

// app.listen(3000, () => {
//     console.log('Server is running on http://localhost:3000');
// });


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

