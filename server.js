const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

const app = express();

// Body Parser Middleware
app.use(express.json());

// ✅ Updated CORS Middleware (Netlify Connection Setup)
app.use(cors({
  origin: ['https://fancy-buttercream-2c1607.netlify.app', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']  // ← Direct arrays closed cleanly
}));

// Routes
app.get('/api/test', (req, res) => res.send('test works'));

const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

const worldRoutes = require('./src/routes/worldRoutes');
app.use('/api/world', worldRoutes);

const bossRoutes = require('./src/routes/bossRoutes');
app.use('/api/boss', bossRoutes);

const petRoutes = require('./src/routes/petRoutes');
app.use('/api/pets', petRoutes);

const profileRoutes = require('./src/routes/profileRoutes');
app.use('/api/profile', profileRoutes);

const chronicleRoutes = require('./src/routes/chronicleRoutes');
app.use('/api/chronicle', chronicleRoutes);

app.get('/', (req, res) => {
  res.send('Questoria Backend is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});