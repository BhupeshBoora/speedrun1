# Speedrun Auth App (PostgreSQL + Passport.js)

Hello,
I hope you're doing well.

This is the code I used in my *Memory only speedrun: (No Internet, No Notes, No Lookups)*

An Express.js authentication app built from scratch in **17 minutes** (and 48 seconds) as a coding speedrun challenge.  

## Features

- Register with email and password  
- Passwords hashed using `bcryptjs`  
- Session based authentication using `passport`  
- PostgreSQL database integration  
- Redirect to home only if logged in  
- Secure credential storage via `.env`

## Tech Stack

- Node.js  
- Express.js  
- Passport.js  
- PostgreSQL  
- bcryptjs  
- dotenv  

## Project Structure

```
.
├── views/
│   ├── index.ejs        # Homepage (only accessible if logged in)
│   └── register.ejs     # Registration form
├── .env                 # Environment variables (ignored in Git)
├── .gitignore
├── README.md
└── index.js             # Main server code
```

## Setup Instructions

1. **Clone this repo**  
   ```bash
   git clone https://github.com/BhupeshBoora/speedrun1.git
   cd speedrun1
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Create a `.env` file**  
   Add your PostgreSQL credentials:
   ```
   dbUser=your_db_user
   dbHost=localhost
   dbDatabase=your_db_name
   dbPassword=your_db_password
   dbPort=your_db_port
   ```

4. **Set up PostgreSQL table**

   ```sql
   CREATE TABLE users (
     id SERIAL PRIMARY KEY,
     email TEXT UNIQUE NOT NULL,
     password TEXT NOT NULL
   );
   ```

5. **Run the app**  
   ```bash
   node index.js
   ```

6. **Go to**  
   [http://localhost:3000](http://localhost:3000)

---

## Screens

Very minimal UI. Just an `index.ejs` and a `register.ejs` with a form.

---

## Speedrun Time

Completed in **17 minutes and 48 seconds**  
Challenge: Setup + DB + Auth + Session (and yes ofcourse, all without any external help)

---
