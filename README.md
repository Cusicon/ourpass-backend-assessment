# OurPass Backend Assessment

An OurPass backend interview test to create a content management CRUD API.

<br>

## Installation 💻

Here is the Live [API](https://ourpass-backend-development.herokuapp.com/) hosted at Heroku

Visit the url and be pleased 💪🏾
<br>
<br>

## API Endpoints 🔗

I sent invites to <akinwizguy@gmail.com> and <flashup4all@gmail.com>, a copy of the [postman collection](https://go.postman.co/workspace/New-Team-Workspace~390aa048-424b-4138-8e4a-d81e6eafebbf/collection/18382461-ec7d450a-369d-45eb-966e-61c7d2f59703?action=share&creator=18382461) I made all endpoint calls at, please refer to that.

Incase that is not found or not understood, I've also kept this for reference purposes.
<br>
Thank you 💯😇

<br>

# Endpoints Documentation 📚

A complete listing of endpoints, parameters and body for an easier consumption of the API.
<br>
<br>

<code>
Authorization Header: Bearer {{Token}}
</code>

<br>
<br>

### Auth Module (Bearer Token: None)

- POST: {{base_url}}/api/v1/auth/signup | `SignUp user`
- POST: {{base_url}}/api/v1/auth/signin | `SignIn user`
  <br>
  <br>

### Users Module (Bearer Token: `JWTAccessToken`)

- GET: {{base_url}}/api/v1/users | `Get all users`
- PATCH: {{base_url}}/api/v1/users/profile | `Edit a user's info`

```json
Body: {
	"name": "Mr. Delfina Keeling"
}
```

<br>
<br>

### Posts Module (Bearer Token: `JWTAccessToken`)

- POST: {{base_url}}/api/v1/posts/new | `Create a new post`

```json
Body: {
	"title": "Post 1",
	"description": "This is post one"
}
```

- GET: {{base_url}}/api/v1/posts | `Get all posts`
- PATCH: {{base_url}}/api/v1/posts/:id | `Update a single post`

```json
Param: {
    "id": "63197ec58e0d078546e01868"
}

Body: {
	"title": "Backend Role at OurPass",
	"description": "Welcome, the job is going to be fun"
}
```

- DELETE: {{base_url}}/api/v1/posts/:id | `Delete a post`

```json
Param: {
    "id": "63197ec58e0d078546e01868"
}
```

<br>
<br>

### Categories Module (Bearer Token: `JWTAccessToken`)

- POST: {{base_url}}/api/v1/:postId/categories/new | `Create a new category`

```json
Param: {
    "postId": "63197ec58e0d078546e0186a"
}
Body: {
	"title": "Category for you",
	"description": "Welcome to Cat house"
}
```

- GET: {{base_url}}/api/v1/:postId/categories | `Get all categories`

```json
Param: {
    "postId": "63197ec58e0d078546e0186a"
}
```

- PATCH: {{base_url}}/api/v1/:postId/categories/:id | `Update a single category`

```json
Param: {
    "postId": "631905e6591a6067e75a9d01",
    "id": "6319259fcdd29345f9d86725"
}
Body: {
	"title": "Cat 3",
	"description": "Welcome to Cat 3"
}
```

- DELETE: {{base_url}}/api/v1/:postId/categories/:id | `Delete a category`

```json
Param: {
    "postId": "631905e6591a6067e75a9d01",
    "id": "63192375e06b16121940c732"
}
```

<br>

## Enjoy 🎉🥳💪🏾

I'm pretty sure you'll love what I did.

<br>
<br>

## Author 🧑🏾‍💻😁

[Success Chukwu](https://iam.successchukwu.com)<br>
Email: <iamcusicon@gmai.com>
