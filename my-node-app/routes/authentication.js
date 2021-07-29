const express = require('express');
const router = express.Router();
const jwtManager = require('../jwt/jwtManager');
const hasher = require('bcryptjs');
const env = require('dotenv').config();
const collection_users = process.env.USERCOLLECTION;

//http://localhost:4000/api/v1/authenticate/login
router.post('/login', (req, res) => {
    req.db.collection(collection_users)
        .findOne({ 'email': req.body.email })
        .then(data => {
            console.log(data)
            if (data && hasher.compareSync(req.body.password, data.password)) {

                const payload = {
                    email: data.email,
                    _id: data._id,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    city: data.address.city
                };


                const token = jwtManager.generate(payload);
                res.json({ status: 'success', token: token, city: payload.city, _id: payload._id });
            } else {
                res.json({ status: 'invalid_user' });
            }
        })
        .catch(err => {
            res.json({ status: 'invalid_user' });
        })
});


//http://localhost:4000/api/v1/authenticate/signup
router.post('/signup', (req, res) => {

    req.db.collection(collection_users).findOne({ 'email': req.body.email })
        .then(doc => {
            if (doc) {
                res.json({ status: 'user exists' });
            } else {
                const user = {};
                user.firstName = req.body.firstName;
                user.lastName = req.body.lastName;
                user.email = req.body.email
                user.password = hasher.hashSync(req.body.password, 12);
                user.phone = req.body.phone;
                user.address = {
                    state: req.body.state,
                    city: req.body.city,
                    zipcode: req.body.zipcode
                };
                user.posts = []
                req.db.collection(collection_users).insertOne(user)
                    .then(data => {
                        res.json({ status: 'success' });
                    })
                    .catch(err => {
                        res.json({ status: "fail" })
                    })
            }
        })
        .catch(err => {
            res.json({ status: "fail to find user" })
        })
});


module.exports = router;





















module.exports = router;