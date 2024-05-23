# Run npm init -y
npm init -y

# Install Express, dotenv, mongoose, and nodemon
npm install express dotenv mongoose nodemon --save

# Create directories
$directories = @("controllers", "models", "routes", "middleware", "config", "public", "utils", "tests", "logs")
$directories | ForEach-Object {
    New-Item -Name $_ -ItemType Directory
}

# Create server.js file content
$serverJSContent = @'
const express = require('express');
const app = express();
const port = 3000;

require("./config/database"); // Import database configuration

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log("Server is running on http://localhost:" + port);
});
'@

# Write content to server.js file
$serverJSContent | Set-Content -Path "server.js" -Encoding UTF8

# Create database.js file content
$databaseJSContent = @'
require("dotenv").config();
const mongoose = require("mongoose");

// Connect to the database
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true  
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });
'@

# Create config folder if not exists
$configPath = ".\config"
if (-not (Test-Path $configPath -PathType Container)) {
    New-Item -Path $configPath -ItemType Directory
}

# Write content to database.js file in config folder
$databaseJSContent | Set-Content -Path ".\config\database.js" -Encoding UTF8

# Prompt for user input and create .env file
$mongoURL = Read-Host "Enter MONGODB_URL"
$tokenKey = Read-Host "Enter TOKEN_KEY"
$jwtSecret = Read-Host "Enter JWT_SECRET"
$jwtLifetime = Read-Host "Enter JWT_LIFETIME"

@"
MONGODB_URL=$mongoURL
TOKEN_KEY=$tokenKey
JWT_SECRET=$jwtSecret
JWT_LIFETIME=$jwtLifetime
"@ | Set-Content -Path ".env" -Encoding UTF8



Write-Host "Setup completed successfully."
