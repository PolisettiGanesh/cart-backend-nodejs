# Cart Backend (Node.js)

E-commerce backend application built using Node.js, Express, and MongoDB.

## Features (Day 1)
- Express server setup
- MongoDB connection using Mongoose
- User model with schema validation
- Create User API
- Duplicate email check

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose

## Project Structure
cart-backend/
├── index.js
├── models/
│   └── users.js
├── routes/
│   └── users.js
## Status
🚧 In progress – Day 1 complete
====================================================

1. npm i bcrypt
2. Import bcrypt on newly created file hash-pass.js
            const bcrypt = require('bcrypt');

            async function hashPass(){
                const password ="12345";
                const hashedPass = await bcrypt.hash(password,10);
                console.log(hashedPass);
            }
            hashPass();
            hashPass();

