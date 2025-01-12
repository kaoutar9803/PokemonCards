const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const Pokemon = require('../models/Pokemon');

beforeAll(async () => {
  await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /api/pokemons (with token)', () => {
  it('should fetch all pokemons with a valid token', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODNlOWIwYTAwOTQ0YWI2NmMwMTcwNSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM2Njk4NDM5LCJleHAiOjE3MzY3MDIwMzl9.-V9Mc63wRDGYwADmPfKfrkLenrOxEJ3cHfTWQfr_zLY'; // Remplacez par un token valide
  
    const response = await request(app)
      .get('/api/pokemons')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/)
      .expect(200); 

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return 401 if no token is provided', async () => {
    const response = await request(app)
      .get('/api/pokemons')
      .expect(401);
  });
});

describe('POST /api/pokemons (with token)', () => {
    it('should create a new pokemon with valid token', async () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODNlOWIwYTAwOTQ0YWI2NmMwMTcwNSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM2Njk4NDM5LCJleHAiOjE3MzY3MDIwMzl9.-V9Mc63wRDGYwADmPfKfrkLenrOxEJ3cHfTWQfr_zLY'; // Utilisez un token valide ici
  
      const newPokemon = {
        name: 'Houssam',  
        type: 'Électrique',
        hp: 55,
        attacks: [
          { name: 'Éclair', damage: 10 },
          { name: 'Queue de fer', damage: 25 },
        ],
      };
  
      const response = await request(app)
        .post('/api/pokemons')
        .set('Authorization', `Bearer ${token}`)
        .send(newPokemon)
        .expect('Content-Type', /json/)
        .expect(201);  
  
      expect(response.body.name).toBe('Houssam');
    });
  
    it('should return 401 if no token is provided', async () => {
      const newPokemon = {
          name: 'Hassna',
          type: 'Électrique',
          hp: 55,
          attacks: [
            { name: 'Éclair', damage: 10 },
            { name: 'Queue de fer', damage: 25 },
          ],
      };
  
      const response = await request(app)
        .post('/api/pokemons')
        .send(newPokemon)
        .expect(401); 
    });
  });
  
  describe('PUT /api/pokemons/:id (with token)', () => {
    it('should update a pokemon with a valid token', async () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODNlOWIwYTAwOTQ0YWI2NmMwMTcwNSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM2Njk4NDM5LCJleHAiOjE3MzY3MDIwMzl9.-V9Mc63wRDGYwADmPfKfrkLenrOxEJ3cHfTWQfr_zLY'; // Remplacez par un token valide
  
      // Créer un Pokémon pour tester la mise à jour
      const pokemon = await Pokemon.create({
          name: 'yassmin',
          type: 'Électrique',
          hp: 55,
          attacks: [
            { name: 'Éclair', damage: 10 },
            { name: 'Queue de fer', damage: 25 },
          ],
      });
  
      const updatedData = {
          name: 'Fatima',  
          type: 'Électrique',
          hp: 55,
          attacks: [
            { name: 'Éclair', damage: 10 },
            { name: 'Queue de fer', damage: 25 },
          ],
      };
  
      const response = await request(app)
        .put(`/api/pokemons/${pokemon._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedData)
        .expect('Content-Type', /json/)
        .expect(200);  
  
      expect(response.body.name).toBe('Fatima');
      expect(response.body.hp).toBe(55);
    });
  
    it('should return 401 if no token is provided', async () => {
      const pokemon = await Pokemon.create({
          name: 'Wiam',
          type: 'Électrique',
          hp: 55,
          attacks: [
            { name: 'Éclair', damage: 10 },
            { name: 'Queue de fer', damage: 25 },
          ],
      });
  
      const updatedData = {
          name: 'pikatchu',
          type: 'Électrique',
          hp: 55,
          attacks: [
            { name: 'Éclair', damage: 10 },
            { name: 'Queue de fer', damage: 25 },
          ],
      };
  
      const response = await request(app)
        .put(`/api/pokemons/${pokemon._id}`)
        .send(updatedData)
        .expect(401); 
    });
  });
  
describe('DELETE /api/pokemons/:id (with token)', () => {
  it('should delete a pokemon with a valid token', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODNlOWIwYTAwOTQ0YWI2NmMwMTcwNSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM2Njk4NDM5LCJleHAiOjE3MzY3MDIwMzl9.-V9Mc63wRDGYwADmPfKfrkLenrOxEJ3cHfTWQfr_zLY'; // Remplacez par un token valide

    const pokemon = await Pokemon.create({
        name: 'Nissrin',
        type: 'Électrique',
        hp: 55,
        attacks: [
          { name: 'Éclair', damage: 10 },
          { name: 'Queue de fer', damage: 25 },
  
        ],
    });

    const response = await request(app)
      .delete(`/api/pokemons/${pokemon._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200); 

    expect(response.body.message).toBe('Pokemon deleted');
  });

  it('should return 401 if no token is provided', async () => {
    const pokemon = await Pokemon.create({
        name: 'MEME',
        type: 'Électrique',
        hp: 55,
        attacks: [
          { name: 'Éclair', damage: 10 },
          { name: 'Queue de fer', damage: 25 },
  
        ],
    });

    const response = await request(app)
      .delete(`/api/pokemons/${pokemon._id}`)
      .expect(401); 
  });
});
