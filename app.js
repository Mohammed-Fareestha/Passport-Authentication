const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
    // const passport = require('passport')

const app = express()

//passport config
// require('./config/passport')(passport)

//DB config
const db = require('./config/keys').mangoURI;
const passport = require('passport');

//Connect to mango 
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connecting.....'))
    .catch(err => console.log(err));

//Ejs
app.use(expressLayouts);
app.set('view engine', 'ejs')

//Body-parser
app.use(express.urlencoded({ extended: false }))

//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))

// //Password Middleware
// app.use(passport.initialize());
// app.use(passport.session())

//connect Flash
app.use(flash())

//Globle Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg')
    next();
})

//Router
app.use('/', require('./routes/index'))

app.use('/users', require('./routes/users'))


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`sever starting on Port ${PORT}`));

//<% include ./partials/message %>