const express = require('express');
const app = express();
const connectDB = require('./config/database');
const authRoute = require('./routes/authRouter');
const inventoryRoute = require('./routes/inventoryRoutes');
const stockRoute = require('./routes/stockRouter');
const reportingRoute = require('./routes/reportingRoutes');
const notificationRoute = require('./routes/notificationRoutes');
const setupSwagger = require('./config/swagger');
const dotenv = require('dotenv');
const errorHandlerMiddleware = require("./middleware/error-handler");
const { logger } = require("./middleware/logger");


// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();
app.use(logger);  // Logger middleware should be before routes

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/inventory', inventoryRoute);
app.use('/api/stock-movements', stockRoute);
app.use('/api/reports', reportingRoute);
app.use('/api/notifications', notificationRoute);
setupSwagger(app);
app.use(errorHandlerMiddleware);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
