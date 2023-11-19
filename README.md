# BookHub API

Welcome to Book Hub API backend repository ! This repository contains the code of BookHub backend web application . This backend is built using Node.js, Express, and other technologies to provide the necessary server and API functionality for the application.

## Table of Contents

- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Testing](#testing)

## Getting Started

 1. Clone this repository to your local development environment:

   ```bash
   git clone https://github.com/KhalilAbdulKarim/bookhub_app.git
   ```

2. Installing dependencies on the root directory 

- ```npm install``` 
- ```npm install express```
- ```npm install express-validator```
- ```npm install express moment```
- ```npm install express mysql2```
- ```npm install express nodemon```
- ```npm install express body-parser```
- ```npm install express dotenv```


## Project Structure

- `./controllers` : Contains controller files that handle API requests.

- `./db` : Contains database setup and configuration.

- `./services` : Contains services of each DB table.

- `./validations` : Contains creation and update validations for each service.

- `./routes` : Contains definitions of API routes and their corresponding controllers.


## Configuration
Environment Variables: App and Database Credentials in ```.env```

## Dependencies

- ```Express``` : For handling HTTP requests.
- ```Mysql2``` : To connect with MySQL database.
- ```Dotenv``` : To load environment variables from a .env file into process.env.
- ```Nodemon``` : To automatically restart NodeJS application when changes are made.
- ```Body Parser``` : Parse incoming request bodies in middleware functions.
- ```express-validator``` : Validations to check the validity of HTTP requests in Express application.

## Testing

To start testing, you can use the following commands:
- `npm run dev`: This will run the app on port ```3002``` in development mode using Nodemon. It will keep watching any changes in your codebase.
This will start the app at `localhost:3002`, and it will also watch your files for any changes. If there is a change, it will auto-restart the server.

Testing can include using Postman:
- For example

1. Open Postman and enter localhost:3002 as your URL.
2. Click on 'POST' method and select '/api/users' endpoint.
3. In Headers tab, add key as "Content-Type" and value as "application/json".
4. Enter JSON data in Body section like this:
```bash
 {
    "userName": "user",
    "userPassword": "User@$12345",
    "userEmail": User"@example.com",
    "dob": "2022-01-01"
}
```
5. Hit Send button. You should get a response containing user details including ID, name, email ,dob and password .
5. Hit Send button. You should get response code 200 if everything is fine.
6. Now try adding an existing user by entering same email address again. It will return error message saying "User already exists."
6. Now try sending same POST request again (with existing email). It will give you error message saying
that user already exists.
7. Try updating an existing user by selecting PUT method at /api/users/:id endpoint. Update name field only.
8. Then try deleting the created user by selecting DELETE method at /api/users/:id endpoint.
9. If all tests pass, it means the project works correctly.


















