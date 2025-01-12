
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

// Middlewares pour parser les requêtes JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Variables d'environnement
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

// Connexion à MongoDB
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

const pokemonRoutes = require('./routes/pokemon');
const authRoutes = require('./routes/auth');

app.use('/api/auth', authRoutes); 
app.use('/api/pokemons', pokemonRoutes);


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
module.exports = app; 