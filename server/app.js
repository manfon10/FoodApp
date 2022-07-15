const express = require('express');
const cors = require('cors');

// Utils
const { globalErrorHandler } = require('./utils/errors');

// Routers
const { usersRouter } = require('./routes/userRoutes');
const { cartRouter } = require('./routes/cartRoutes');
const { categoriesRouter } = require('./routes/categoryRoutes');
const { foodRouter } = require('./routes/foodRoutes');
const { ordersRouter } = require('./routes/orderRoutes');

// Init express app
const app = express();

// Enable cors
app.use(cors());

// Enable incoming JSON data
app.use(express.json());

// Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/food', foodRouter);
app.use('/api/v1/orders', ordersRouter);

// Global error handler
app.use('*', globalErrorHandler);

module.exports = { app };