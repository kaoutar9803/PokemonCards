// models/Card.js
const mongoose = require('mongoose');

const pokemonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Le nom de la carte est obligatoire'],
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'Le type de la carte est obligatoire'],
  },
  hp: {
    type: Number,
    required: [true, 'Les points de vie sont obligatoires'],
    min: [1, 'Les points de vie doivent être au moins 1'],
  },
  attacks: {
    type: [
      {
        name: {
          type: String,
          required: [true, 'Le nom de l\'attaque est obligatoire'],
          trim: true,
        },
        damage: {
          type: Number,
          required: [true, 'Les dégâts de l\'attaque sont obligatoires'],
          min: [0, 'Les dégâts doivent être un nombre positif'],
        },
      },
    ],
    default: [], 
    validate: [arrayLimit, 'Une carte ne peut pas avoir plus de 4 attaques'],
  },
  
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

// Fonction de validation pour limiter le nombre d'attaques
function arrayLimit(val) {
    return val.length <= 4; 
  }
  
module.exports = mongoose.model('Pokemon', pokemonSchema);