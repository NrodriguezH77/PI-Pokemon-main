const { Router } = require('express');
const router = Router();
const axios = require('axios');
const { getPokemonsApi, getPokemonsByName, getPokemonById, getAllPokemons, normalizeInfoApi, postPokemon} = require('../controllers/controllerPokemons');
const {Pokemon} = require('../db')

//Busqueda por id
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const pokemon = await getPokemonById(id)
        res.json(pokemon)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
});

//Busqueda por name o de todos los Pokemons
router.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        if(name){
           const pokemon = [await getPokemonsByName(name)];
          return res.json(pokemon);
        }
        const pokemon = await getAllPokemons();
        res.json(pokemon);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
});



router.post('/', async (req, res) => {
    const {name, hp, attack, speed, defense, height, weight, image, types} = req.body;
    if(!name) return res.status(404).json({error: '¡Faltan datos obligatorios!'})
    try {
        await postPokemon(name, hp, attack, speed, defense, height, weight, image, types);
        res.json({success: 'Pokemon creado con exito'});
    } catch (error) {
        res.status(404).json({error: error.message})
    }
});

module.exports = router;