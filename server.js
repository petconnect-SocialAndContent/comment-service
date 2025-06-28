require('dotenv').config(); // 👈 Faltaba

const express = require('express');
const mongoose = require('mongoose');
const commentRoutes = require('./routes/commentRoutes.js');
const authMiddleware = require('./middleware/authMiddleware.js');

const app = express();
app.use(express.json());

// Usar variable correcta
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/commentdb';

// Conexión MongoDB (sin opciones deprecadas)
mongoose.connect(MONGODB_URI)
  .then(() => console.log('🟢 Connected to MongoDB (comment-service)'))
  .catch(err => {
    console.error('🔴 Error connecting to MongoDB:', err);
    process.exit(1);
  });

// JWT Middleware global
app.use(authMiddleware);

// Rutas
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
  console.log(`🚀 comment-service running on port ${PORT}`);
});
