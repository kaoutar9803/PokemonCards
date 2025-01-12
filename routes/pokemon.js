const express = require('express');
const Pokemon = require('../models/Pokemon');
const authenticateToken = require('../middleware/auth');
const router = express.Router();


// Ajouter une carte Pokémon
router.post('/', authenticateToken, async (req, res) => { 
    try {
      const newPokemon = new Pokemon(req.body);
      const savedPokemon = await newPokemon.save();
      res.status(201).json(savedPokemon);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  


// Visualiser toutes les cartes (route sécurisée)
router.get('/', authenticateToken, async (req, res) => {
    try {
      const pokemons = await Pokemon.find();
      res.json(pokemons);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Mettre à jour une carte (route sécurisée)
  router.put('/:id', authenticateToken, async (req, res) => {
    try {
      const updatedPokemon = await Pokemon.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedPokemon);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  // Supprimer une carte (route sécurisée)
  router.delete('/:id', authenticateToken, async (req, res) => {
    try {
      await Pokemon.findByIdAndDelete(req.params.id);
      res.json({ message: 'Pokemon deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Route pour ouvrir un pack de booster (route sécurisée)
  router.get('/booster', authenticateToken, async (req, res) => {
    try {
      const packSize = 5; 
      const boosterPack = await Pokemon.aggregate([{ $sample: { size: packSize } }]);
      res.json(boosterPack);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  

module.exports = router;
