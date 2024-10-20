const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const HttpError = require('./models/http-error');
const checkAuth = require('./middleware/check-auth');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Add headers to handle CORS Errors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Specify the allowed origin
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE");

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200); // Respond with 200 for preflight requests
  }

  next();
});
// Middleware to parse JSON bodies
app.use(express.json());

// Route imports
const adminRoutes = require('./routes/admin-routes');
const usersRoutes = require('./routes/user-routes');
const voteRoutes = require('./routes/vote-routes');
const electionRoutes = require('./routes/election-routes');

// Use routes

app.use('/api/users', usersRoutes);
app.use('/api/votes', voteRoutes);
app.use('/api/elections', electionRoutes); // Use election routes
app.use('/api/admin',adminRoutes);

// Handle 404 errors for unknown routes
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  next(error);
});

// Global error handler
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });
