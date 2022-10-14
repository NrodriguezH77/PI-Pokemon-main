const { Router } = require('express');
const router = Router();
const { getPokemonsByName, getPokemonById, getAllPokemons, postPokemon} = require('../controllers/controllerPokemons');
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


//Creación de un pokemon
router.post('/', async (req, res) => {
    const {namePokemon, hp, attack, speed, defense, height, weight, image, types} = req.body;
    if(!namePokemon) return res.status(404).json({error: '¡Faltan datos obligatorios!'})
    try {
       const exist = await postPokemon(namePokemon, hp, attack, speed, defense, height, weight, image, types);
       if(exist) throw new Error('Este Pokemon ya existe');
        res.json({success: 'Pokemon creado con exito'});
    } catch (error) {
        console.log('catch: ',error.message)
        res.status(404).json({error: error.message})
    }
});

router.delete('/', (req, res) => {
    const {id}  = req.body
    try {
        Pokemon.destroy({
            where: {id}
        })
        res.send('Pokemon eliminado')
    } catch (error) {
        res.status(404).send('Error')
    }

})


module.exports = router;