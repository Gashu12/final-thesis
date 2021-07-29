# Backend

In the backend we have one collection which is users

Users collection
```
users = [
    {
        _id: "ObjectID",
        "firstName": "string",
        "lastName": "string",
        "email": "string",
        "password": "string",
        "phone": "string",
        "address": {
            "state": "string",
            "city": "string",
            "zipcode": "string"
        },
        "posts": [
            {
                _id: "ObjectID",
                "post": "string",
                "createdDate": "date",
                "service": "string", //provider or consumer
                "comments": [
                    {
                        _id: "ObjectID",
                        userId:"ObjectID"
                        "firstName": "string",
                        "lastName": "string",
                        "createdDate": "date",
                        "comment": "string"
                    },
                ]

            }
        ]
    }
]
```

- We have nine end points

1. Login:
   http://localhost:4000/api/v1/authenticate/login POST
2. Signup:
   http://localhost:4000/api/v1/authenticate/signup POST
3. Get user by id:
   http://localhost:4000/api/v1/users/:id GET
4. Add post:
   http://localhost:4000/api/v1/users/:id/posts/ POST
5. Add comment:
   http://localhost:4000/api/v1/users/:id/posts/:post_id/comment POST
6. Get comments:
   http://localhost:4000/api/v1/users/:id/posts/:post_id/comment GET 
7. Update address:
   http://localhost:4000/api/v1/users/:id/address PUT
8. Get service providers by city:
   http://localhost:4000/api/v1/users/posts/service-provider/:city GET
9. Get service consumers by city:
   http://localhost:4000/api/v1/users/posts/help-request/:city GET

We use JWT to implement a login system

# Frontend

We have 12 components, three modules, one Main services and interceptor.
Components
1. App
2. Home
   Child components
     1. Login
     2. Signup
3. User Post
   Child components
     1. Consumer
     2. Provider
4. Post Details
5. Post
6. profile
7. MyProfile
8. UpdateAddress

Modulles
1. App
2. Feature Modulles
   1. User:- Module for Lazy loading
   2. Material:-Import needed modules from Angular materials

The first screen the user will see when open the app is the login screen.  
If the user want to signup a new account, the user will click signup tab and go to signup screen.  

If the user is able to login, the user will see the users post screen which will list all the latest posts sorted by date, 
which is filtered by user city. When user login, his token, id and city will be saved in the localStorage for future use.  

Posts will be displayed 25 posts per page and each post will expired with in 48 hours.

If the user click on the users name, they are able to see the users detail. If the user click on view all comments link, they are able to see all the comments of the specific post and can add their comment.   

when the logged users clicked their profile tab, they are able to see their profile details and the option to add post or update their address. 
When the user update their address, the city will update in the local storage which will help users to fetch the posts with the updated city.
Users can add their own post.

If users click Logout button, they will be logged out of the app. The token, city and _id in localStorage will be wipped out. 
If user doesn’t logout, he will not need to login the next time he open the app.

