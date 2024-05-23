const request = require('supertest');
const db = require('../config/database');
const express = require('express');
const bodyParser = require('body-parser');
const EventRouter = require('../routes/Event');
const app = express();

app.use(bodyParser.json());

app.use('', EventRouter);


describe('Tests des routes de catégorie', () => {
  let categoryId; // Stocker l'ID de la catégorie créée pour les tests ultérieurs

  // Test pour ajouter une nouvelle catégorie
  test('Ajouter une nouvelle catégorie', async () => {
      const response = await request(app)
          .post('/ajoutercategorie')
          .send({
              nom: 'Patrimoine culturel',
              description: 'Visites guidées, sites historiques, monuments'
          });
      
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('message', 'Catégorie ajoutée avec succès.');
      categoryId = response.body.id; // Stocker l'ID de la catégorie créée
  });

  // Test pour récupérer une catégorie par ID
  test('Récupérer une catégorie par ID', async () => {
      const response = await request(app)
          .get(`/51/listerbyid`);

      expect(response.statusCode).toBe(200);
      expect(response.body.nom).toBe('Patrimoine culturel'); // Modifier avec le nom de la catégorie ajoutée
  });

  // Test pour lister toutes les catégories
  test('Lister toutes les catégories', async () => {
      const response = await request(app)
          .get('/listercategorie');

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
  });

  // Test pour modifier une catégorie
  test('Modifier une catégorie', async () => {
      const response = await request(app)
          .put(`/51/modifiercategorie`)
          .send({
              nom: 'Patrimoine culturel', // Modifier le nom de la catégorie
              description: 'Visites guidées, sites historiques, monuments'
          });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Catégorie modifiée avec succès.');
  });

  // Test pour supprimer une catégorie
test('Supprimer une catégorie', async () => {
  // Supprimer les événements associés à la catégorie
  await db.query('DELETE FROM categorie WHERE id = ?', [categoryId], async (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Erreur interne du serveur.' });
      }
      // Ensuite, supprimer la catégorie
      const response = await request(app)
          .delete(`/51/supprimercategorie`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Catégorie supprimée avec succès.');
  });
});


  // Test pour rechercher une catégorie
  test('Rechercher une catégorie par nom', async () => {
      const response = await request(app)
          .get('/recherchercategorie?nom=Patrimoine');

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].nom).toContain('Patrimoine');
  });
});












// Tests des routes de evenement
describe('Tests des routes de evenement', () => {
  let eventId; // Stocker l'ID de la evenement créée pour les tests ultérieurs

  // Test pour ajouter une nouvelle evenement
  test('Ajouter une nouvelle evenement', async () => {
      const response = await request(app)
          .post('/ajouter')
          .send({
              titre: 'Le salon international Patrimoine culturel',
              description: 'Le salon international du Patrimoine Culturel est l’évènement de référence qui fédère les professionnels de la restauration et de la sauvegarde du patrimoine bâti ou non bâti, matériel ou immatériel.',
              prix: 10,
              lieu: 'SALLE GABRIEL',
              places_disponibles: 100,
              date_deb: '2024-05-17',
              date_fin: '2024-05-17',
              categorie_id: 45,
              photo_url: '/assets/img/salon.jpg'
          });
      
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('message', 'Événement ajouté avec succès.');
      eventId = response.body.id; 
  });

  // Test pour récupérer une evenement par ID
  test('Récupérer une evenement par ID', async () => {
      const response = await request(app)
          .get(`/36/listereventbyid`);

      expect(response.statusCode).toBe(200);
      expect(response.body.titre).toBe('Le salon international Patrimoine culturel');
  });

  // Test pour lister toutes les evenement
  test('Lister toutes les evenements', async () => {
      const response = await request(app)
          .get('/lister');

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
  });

  // Test pour modifier une evenement
  test('Modifier une evenement', async () => {
      const response = await request(app)
          .put(`/36/modifier`)
          .send({
              titre: 'Le salon international Patrimoine culturels',
              description: 'Le salon international du Patrimoine Culturel est l’évènement de référence qui fédère les professionnels de la restauration et de la sauvegarde du patrimoine bâti ou non bâti, matériel ou immatériel.',
              prix: 10,
              lieu: 'SALLE GABRIEL',
              places_disponibles: 100,
              date_deb: '2024-05-17',
              date_fin: '2024-05-17',
              categorie_id: 45,
              photo_url: '/assets/img/salon.jpg'
          });

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('message', 'Événement modifié avec succès.'); 
  });

  // Test pour supprimer une evenement
  test('Supprimer une evenement', async () => {
    // Supprimer les événements associés à la catégorie
    await db.query('DELETE FROM evenement WHERE id = ?', [eventId], async (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erreur interne du serveur.' });
        }
        // Ensuite, supprimer la catégorie
        const response = await request(app)
            .delete(`/36/supprimer`);
  
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'Catégorie supprimée avec succès.');
    });
  });
  
  // Test pour rechercher une evenement
  test('Rechercher une evenement par titre', async () => {
      const response = await request(app)
          .get('/rechercher?titre=Le salon international Patrimoine culturel');

      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].titre).toContain('Le salon international Patrimoine culturel');
  });
});




