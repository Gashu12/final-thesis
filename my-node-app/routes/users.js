const { ObjectID } = require('bson');
const express = require('express');
const env = require('dotenv').config();
const collection_users = process.env.USERCOLLECTION;
const router = express.Router();
const authorization = require('../middleware/authorization');

//http://localhost:4000/api/v1/users/:id GET
router.get('/:id', (req, res) => {
    req.db.collection(collection_users).findOne({ _id: new ObjectID(req.params.id) }, { projection: { posts: 0 } })
        .then(doc => {
            if (doc) {
                res.status(200).json({ status: "success", result: doc });
            } else {
                res.status(204).json({ status: "success", result: doc })
            }
        })
        .catch(err => {
            res.json({ status: "fail" });
        })
})

//http://localhost:4000/api/v1/users/:id/posts/ POST
router.post('/:id/posts', (req, res) => {

    const date = new Date();
    const post = {
        _id: ObjectID(),
        post: req.body.post,
        service: req.body.service,
        createdDate: date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear(),
        comments: []
    };

    req.db.collection(collection_users).updateOne(
        { _id: new ObjectID(req.params.id) },
        { $push: { posts: post } }
    ).then((doc) => {
        res.json({ status: "success", result: post._id });
    }).catch((error) => res.json({ status: "fail1" }))
})

//http://localhost:4000/api/v1/users/:id/posts/:post_id/comments GET
router.get('/:id/posts/:post_id/comments', (req, res) => {
    console.log('get', req.payload.city)
    req.db.collection(collection_users).aggregate([
        { $match: { _id: new ObjectID(req.params.id) } },
        { $unwind: "$posts" },
        { $match: { "posts._id": new ObjectID(req.params.post_id) } },
        { $project: { "posts.comments": 1 } }
    ]).toArray().then(doc => {
        res.json({ status: "success", result: doc });
    })
        .catch(err => {
            res.json({ status: "fail" });
        })
})

//http://localhost:4000/api/v1/users/:id/posts/:id/comments POST
router.post('/:id/posts/:post_id/comments', (req, res) => {

    const date = new Date();
    const comment = {
        _id: ObjectID(),
        firstName: req.payload.firstName,
        userId: req.payload._id,
        lastName: req.payload.lastName,
        createdDate: date.getMonth() + 1 + "-" + date.getDate() + "-" + date.getFullYear(),
        comment: req.body.comment
    };

    req.db.collection(collection_users).updateOne(
        { _id: new ObjectID(req.params.id), "posts._id": new ObjectID(req.params.post_id) },
        { $push: { "posts.$.comments": comment } }
    ).then((doc) => {
        res.json({ status: "success" });
    }).catch((error) => res.json({ status: "fail" }))
})

//http://localhost:4000/api/v1/users/:id/address PUT

router.put('/:id/address', authorization.updateAdress, (req, res) => {

    const address = {
        state: req.body.state,
        city: req.body.city,
        zipcode: req.body.zipcode
    };

    
    const query = { _id: new ObjectID(req.params.id) };
    const set = { $set: { address: address } };

    req.db.collection(collection_users).updateOne(query, set)
        .then(doc => {

            res.json({ status: "success" });
        })
        .catch(err => {
            res.json({ status: "fail" });
        })
})

//http://localhost:4000/api/v1/users/posts/service-provider/:city GET

router.get("/posts/service-provider/:city", (req, res) => {
    console.log(req.payload.city)

    req.db
        .collection(collection_users)
        .aggregate([
            { $match: { "address.city": req.params.city } },
            { $unwind: "$posts" },
            { $sort: { "posts.createdDate": -1 } },
            { $match: { "posts.service": "provider" } },

            {
                $group: {
                    _id: "service_provider",
                    posts: {
                        $push: { _id: "$_id", firstName: "$firstName", lastName: "$lastName", post: "$posts" }
                    }
                }
            },
        ])
        .sort({ createdDate: -1 })
        .toArray()
        .then(doc => {
            console.log(doc)
            res.json({ status: "success", result: doc });
        })
        .catch(err => {
            res.json({ status: "fail" });
        })
});

//http://localhost:4000/api/v1/users/posts/help-request/:city GET


router.get("/posts/help-request/:city", (req, res) => {
console.log(req.query.page)
    req.db
        .collection(collection_users)
        .aggregate([
            { $match: { "address.city": req.params.city } },
            { $unwind: "$posts" },
            { $sort: { "posts.createdDate": -1 } },
            { $match: { "posts.service": "consumer" } },

            {
                $group: {
                    _id: "help_request",
                    posts: {
                        $push: { _id: "$_id", firstName: "$firstName", lastName: "$lastName", post: "$posts" }
                    }
                }
            },
        ])
        .sort({ createdDate: -1 })
        .toArray()
        .then(doc => {
            res.json({ status: "success", result: doc });
        })
        .catch(err => {
            res.json({ status: "fail" });
        })
});


//http://localhost:4000/api/v1/users/:id/profile PATCH

router.patch("/:id/profile", (req, res) => {

    const query = { _id: new ObjectID(req.params.id) };
    const set = { $set: { image: req.body } };

    req.db.collection(collection_users).updateOne(query, set)
        .then(doc => {

            res.json({ status: "success", result:doc });
        })
        .catch(err => {
            res.json({ status: "fail" });
        })
})


module.exports = router;