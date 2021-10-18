const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')

//Model Users
const User = require('../models/User');
const { response } = require('express');

//Login
router.get('/login', (req, res) => res.render('login'))

//Register
router.get('/register', (req, res) => res.render('register'))

//Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    //Check the required field
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill the all FIELD!' })
    }

    //Check password match
    if (password !== password2) {
        errors.push({ msg: 'Password do not match' })
    }

    //Chech the password Length
    if (password.length < 6) {
        errors.push({ msg: 'password should be at atleast 6 character' })
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    } else {
        //Validation Passed
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push({ msg: 'Email is already register' })
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    })
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    //Hash Password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            //set password to hashed
                            newUser.password = hash;
                            //save user
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You have succsfully REGISTER now!, You can login')
                                    res.redirect('/users/login')
                                })
                                .catch(err => console.log(err))
                        }))
                }
            })
    }
})

module.exports = router