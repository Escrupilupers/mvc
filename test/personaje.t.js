const request = require('supertest');
const app = require('../server'); // Asegúrate de que app está exportado correctamente desde tu archivo server.js
const Character = require('../models/character');

describe('Character API', () => {
    // Limpiar la base de datos antes de cada prueba
    beforeEach(async () => {
        await Character.destroy({ where: {} });
    });

    // Test para crear un nuevo personaje
    it('should create a new character', async () => {
        const newCharacter = {
            name: 'Jinwoo Sung',
            age: 24,
            attributes: {
                power: 100,
                agility: 85,
                intelligence: 90
            },
            important_details: 'The protagonist of Solo Leveling.'
        };

        const res = await request(app)
            .post('/api/characters')
            .send(newCharacter)
            .set('Accept', 'application/json');

        expect(res.status).toBe(201); // Código de respuesta 201 para creación
        expect(res.body.name).toBe(newCharacter.name);
        expect(res.body.age).toBe(newCharacter.age);
        expect(res.body.attributes).toEqual(newCharacter.attributes);
        expect(res.body.important_details).toBe(newCharacter.important_details);
    });

    // Test para obtener todos los personajes
    it('should return all characters', async () => {
        const character = await Character.create({
            name: 'Jinwoo Sung',
            age: 24,
            attributes: {
                power: 100,
                agility: 85,
                intelligence: 90
            },
            important_details: 'The protagonist of Solo Leveling.'
        });

        const res = await request(app).get('/api/characters');

        expect(res.status).toBe(200); // Código de respuesta 200 para éxito
        expect(res.body).toBeInstanceOf(Array); // La respuesta debe ser un array
        expect(res.body[0].name).toBe(character.name);
    });

    // Test para crear un personaje sin campos obligatorios
    it('should return an error if required fields are missing', async () => {
        const newCharacter = {
            age: 24,
            attributes: {
                power: 100,
                agility: 85,
                intelligence: 90
            },
            important_details: 'The protagonist of Solo Leveling.'
        };

        const res = await request(app)
            .post('/api/characters')
            .send(newCharacter)
            .set('Accept', 'application/json');

        expect(res.status).toBe(400); // Código de respuesta 400 por error de validación
        expect(res.body.message).toBe('Faltan datos requeridos');
    });
});
