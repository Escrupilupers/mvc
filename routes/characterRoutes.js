const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

// Rutas de personajes
router.get('/characters', characterController.getAllCharacters);
router.get('/characters/:id', characterController.getCharacterById);
router.post('/characters', characterController.createCharacter);
router.put('/characters/:id', characterController.updateCharacter);
router.delete('/characters/:id', characterController.deleteCharacter);

module.exports = router;
