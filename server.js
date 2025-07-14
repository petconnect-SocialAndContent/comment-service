require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const commentRoutes = require('./routes/commentRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('🟢 Connected to MongoDB (comment-service)'))
  .catch(err => {
    console.error('🔴 Error connecting to MongoDB:', err);
    process.exit(1);
  });

// JWT Middleware global
app.use(authMiddleware);

// Prefijo estándar REST
app.use('/api/v1/comments', commentRoutes);

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(`🚀 comment-service running on port ${PORT}`);
});
