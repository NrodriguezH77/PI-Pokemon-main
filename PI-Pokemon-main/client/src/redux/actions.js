import axios from 'axios'

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';
export const GET_TYPES = 'GET_TYPES';
export const GET_POKEMON_DETAIL = 'GET_DETAIL';
export const POST_POKEMON = 'POST_POKEMON';
export const FILTER_POKEMONS_CREATED = 'FILTER_POKEMONS_CREATED';
export const FILTER_POKEMONS_ALPHABETICALLY = 'FILTER_POKEMONS_ALPHABETICALLY'
export const FILTER_POKEMONS_BY_ATTACK = 'FILTER_POKEMONS_BY_ATTACK'
export const FILTER_POKEMONS_BY_TYPE = 'FILTER_POKEMONS_BY_TYPE'
export const LOADING_TRUE = 'LOADING_TRUE';
export const LOADING_FALSE = 'LOADING_FALSE';
export const EMPTY_DETAIL = 'EMPTY_DETAIL';  

export function getAllPokemons(){
    return async  function(dispatch){
        const pokemons = await axios.get('http://localhost:3001/pokemons');
        return dispatch({
            type: GET_ALL_POKEMONS,
            payload: pokemons.data
        })

    }
}


export function getTypes(){
    return async  function(dispatch){
        const types = await axios.get('http://localhost:3001/types');
        return dispatch({
            type: GET_TYPES,
            payload: types.data
        })

    }
}


export function getPokemonByName(name){
    return async function(dispatch){
        try {
            const pokemon = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
            return dispatch({
                type: GET_POKEMON_BY_NAME,
                payload: pokemon.data
            })
        } catch (error) {
            alert('Este pokemon no existe')
        }
    }
}

export function getPokemonDetail(id){
    return async function(dispatch){
        const pokemon = await axios.get(`http://localhost:3001/pokemons/${id}`)
        return dispatch({
            type: GET_POKEMON_DETAIL,
            payload: pokemon.data,
        })
    }
}

export function postPokemon(pokemon){
    return async function(dispatch){
       try {
        const created = await axios.post('http://localhost:3001/pokemons', pokemon)
        alert('Pokemon creado exitosamente')
        return dispatch({
            type: POST_POKEMON,
            payload: created.data.success
        })
       } catch (error) {
        alert('El pokemon ya existe!')
        return dispatch({
            type: POST_POKEMON,
            payload: 'El pokemon ya existe!'
        })
       }
    }
}


export function filterPokemonsCreated(created){ 
    return {
        type: FILTER_POKEMONS_CREATED,
        payload: created
    }
}
export function filterPokemonsAlphabetically(order){ 
    return {
        type: FILTER_POKEMONS_ALPHABETICALLY,
        payload: order
    }
}
export function filterPokemonsByAttack(order){ 
    return {
        type: FILTER_POKEMONS_BY_ATTACK,
        payload: order
    }
}
export function filterPokemonsByType(type){ 
    return {
        type: FILTER_POKEMONS_BY_TYPE,
        payload: type
    }
}

export function loadingTrue(){
    return {
        type: LOADING_TRUE,
        payload: true,
    }
}

export function loadingFalse(){
    return {
        type: LOADING_FALSE,
        payload: false,
    }
}


export function emptyDetail(){
    return {
        type: EMPTY_DETAIL,
        payload: {},
    }
}
