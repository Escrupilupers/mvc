const Character = require('../models/modelscharacter');

// Obtener todos los personajes
exports.getAllCharacters = async (req, res) => {
    try {
        const characters = await Character.findAll();
        res.status(200).json(characters);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener los personajes", error: err });
    }
};

// Obtener un personaje por ID
exports.getCharacterById = async (req, res) => {
    try {
        const character = await Character.findByPk(req.params.id);
        if (!character) {
            return res.status(404).json({ message: "Personaje no encontrado" });
        }
        res.status(200).json(character);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener el personaje", error: err });
    }
};

// Crear un nuevo personaje
exports.createCharacter = async (req, res) => {
    const { name, age, attributes, important_details } = req.body;

    try {
        const newCharacter = await Character.create({ name, age, attributes, important_details });
        res.status(201).json(newCharacter);
    } catch (err) {
        res.status(500).json({ message: "Error al crear el personaje", error: err });
    }
};

// Actualizar un personaje por ID
exports.updateCharacter = async (req, res) => {
    const { name, age, attributes, important_details } = req.body;

    try {
        const character = await Character.findByPk(req.params.id);
        if (!character) {
            return res.status(404).json({ message: "Personaje no encontrado" });
        }

        character.name = name || character.name;
        character.age = age || character.age;
        character.attributes = attributes || character.attributes;
        character.important_details = important_details || character.important_details;

        await character.save();
        res.status(200).json(character);
    } catch (err) {
        res.status(500).json({ message: "Error al actualizar el personaje", error: err });
    }
};

// Eliminar un personaje por ID
exports.deleteCharacter = async (req, res) => {
    try {
        const character = await Character.findByPk(req.params.id);
        if (!character) {
            return res.status(404).json({ message: "Personaje no encontrado" });
        }

        await character.destroy();
        res.status(200).json({ message: "Personaje eliminado con éxito" });
    } catch (err) {
        res.status(500).json({ message: "Error al eliminar el personaje", error: err });
    }
};