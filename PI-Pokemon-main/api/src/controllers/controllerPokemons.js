const axios = require('axios');
const {Pokemon, Type} = require('../db')

function normalizeInfoApi(infoApi){
    return {
        id: infoApi.data.id,
        name: infoApi.data.name[0].toUpperCase() + infoApi.data.name.slice(1),
        types: infoApi.data.types?.map((e) => e.type.name).join(', '),
        hp: infoApi.data.stats[0].base_stat,
        attack:infoApi.data.stats[1].base_stat,
        defense: infoApi.data.stats[2].base_stat,
        speed: infoApi.data.stats[5].base_stat,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${infoApi.data.id}.svg`,
        height: infoApi.data.height,
        weight: infoApi.data.weight,
        createdBd: false,
    }
}

function normalizeInfoDb(infoDb){
    return {
        id: infoDb.id,
        name: infoDb.name,
        types: infoDb.Types?.map(t => t.name).join(', '),
        hp: infoDb.hp,
        attack: infoDb.attack,
        defense: infoDb.defense,
        speed: infoDb.speed,
        image: infoDb.image,
        height: infoDb.height,
        weight: infoDb.weight,
        createdBd: true,
    }
}


async function getPokemonsApi(){
    // Busqueda de todo a la API
    const infoApi1 = await axios.get('https://pokeapi.co/api/v2/pokemon');
    let  nextPage =  infoApi1.data.next;
    
    const infoApi2 = await axios.get(nextPage);
    let results = infoApi1.data.results;

    results = results.concat(infoApi2.data.results);

    const infoApiPromises = results.map((pokemon) => {
        return axios.get(pokemon.url)
        .then(info => normalizeInfoApi(info))
        .catch(error => console.log(error));
    })

    const pokemonsApi = await Promise.all(infoApiPromises)
    
    return pokemonsApi;
}

async function getPokemonsBd(){
    let pokemons = await Pokemon.findAll({
        include: {
            model: Type,
            attribute: ['name'],
            through: {
                attribute: [],
            }
        }
    });
    pokemons = pokemons.map((e) => normalizeInfoDb(e));
    return pokemons;
}


async function getAllPokemons(){
    const pokemonsApi = await getPokemonsApi();
    const pokemonsBd = await getPokemonsBd();
    return pokemonsApi.concat(pokemonsBd);
}


async function getPokemonsByName(name){
    try {
        // Busqueda por name a la API
        name = name.toLowerCase()
        const infoApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemon = normalizeInfoApi(infoApi);
        return pokemon;
    } catch (error) {
        // Busqueda por name a la BD
        name = name[0].toUpperCase() + name.slice(1);
        const pokemon = await Pokemon.findOne({
            where : {name: name},
            include: {
                model: Type,
                attributes: ['name']  
            }
        });
        
        if(pokemon === null) throw new Error('Pokemon not found');
    
        return normalizeInfoDb(pokemon);
    }
    
}


async function getPokemonById(id){
   try {
        const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        return normalizeInfoApi(pokemon)
    } catch (error) {
        const pokemon = await Pokemon.findByPk(id, {
            include: {
                model: Type,
                attributes: ['name']
           }})
           console.log(pokemon)
        if(pokemon === null) throw Error('No existe un Pokemon con el id proporcionado');
        return normalizeInfoDb(pokemon);
   }
}


async function postPokemon(name, hp, attack, speed, defense, height, weight, image, types){
   
    
        // Busqueda por name a la API
       
        
    try {
        name = name.toLowerCase()
        const infoApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        return true;
        
    } catch (error) {
        // Busqueda por name a la BD
        name = name[0].toUpperCase() + name.slice(1);
        const pokemon = await Pokemon.findOne({
            where : {name: name},
            include: {
                model: Type,
                attributes: ['name']  
            }
        });
        
        if(pokemon !== null) throw new Error('Este Pokemon ya existe');

        const  pokemons = await Pokemon.create({name, hp, attack, speed, defense, height, weight, image});
        
        if(types.length === 1) await pokemons.addTypes(types[0]);
        else if(types.length > 1){
            const promises = types.map(t => pokemons.addTypes(t))
            await Promise.all(promises)
        }else if(types.length === 0){
            types = [19]
            await pokemons.addTypes(types[0]);
        }

    }
   



    

   
    
        
}


module.exports = {
    getPokemonsApi,
    getPokemonsBd,
    getAllPokemons,
    getPokemonById,
    getPokemonsByName,
    normalizeInfoApi,
    postPokemon,
}