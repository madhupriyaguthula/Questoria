const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');

dotenv.config();
connectDB();

const app = express();          // ← app ఇక్కడ create అవుతుంది
app.use(express.json());
app.use(cors());
app.get('/api/test', (req, res) => res.send('test works'));
const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);   // ← ఇది app create అయ్యాక రావాలి
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
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Questoria Backend is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});