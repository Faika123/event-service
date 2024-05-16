const express = require('express');
const router = express.Router();
const controller = require('../controllers/EventControllers');

router.get('/lister', controller.listerEvent);
router.get('/:id/listereventbyid', controller.getEventById);
router.post('/ajouter', controller.ajouterEvent);
router.put('/:id/modifier', controller.modifierEvent);
router.delete('/:id/supprimer', controller.supprimerEvent);
router.get('/rechercher', controller.rechercherEvent);

router.get('/listercategorie', controller.listerCategories);
router.get('/:id/listerbyid', controller.getCategorieById);
router.post('/ajoutercategorie', controller.ajouterCategorie);
router.put('/:id/modifiercategorie', controller.modifierCategorie);
router.delete('/:id/supprimercategorie', controller.supprimerCategorie);
router.get('/recherchercategorie', controller.rechercherCategorie);
router.get('/categorie/:id/evenement', controller.listerEvenementsParCategorie);


module.exports = router;
