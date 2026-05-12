// const express = require('express');
// const path = require('path');
// const recommenderRoutes = require('./routes/recommender');

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// // Routes
// app.use('/api', recommenderRoutes);

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });
const express = require('express');
const path = require('path');
const recommenderRoutes = require('./routes/recommender');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', recommenderRoutes);

// Homepage route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// IMPORTANT
module.exports = app;