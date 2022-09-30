import {
  GET_ALL_POKEMONS,
  GET_POKEMON_DETAIL,
  GET_POKEMON_BY_NAME,
  GET_TYPES,
  POST_POKEMON,
  FILTER_POKEMONS_CREATED,
  FILTER_POKEMONS_BY_TYPE,
  FILTER_POKEMONS_ALPHABETICALLY,
  FILTER_POKEMONS_BY_ATTACK,
  LOADING_TRUE,
  LOADING_FALSE,
} from "./actions";

const initialState = {
  pokemonsLoaded: [],
  pokemonDetail: {},
  pokemonTypes: [],
  allPokemons: [],
  loading: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        pokemonsLoaded: action.payload,
        allPokemons: action.payload,
        loading: false,
      };

    case GET_TYPES:
      return {
        ...state,
        pokemonTypes: action.payload,
      };

    case GET_POKEMON_BY_NAME:
      return {
        ...state,
        pokemonsLoaded: action.payload,
        loading: false,
      };

    case GET_POKEMON_DETAIL:
      return {
        ...state,
        pokemonDetail: action.payload,
      };

    case POST_POKEMON:
      alert(action.payload)
      return state

    case FILTER_POKEMONS_CREATED:
      if (action.payload === "api") {
        return {
          ...state,
          pokemonsLoaded: state.allPokemons.filter((p) => {
            return p.createdBd === false;
          }),
          loading: false,
        };
      } else if (action.payload === "bd") {
        return {
          ...state,
          pokemonsLoaded: state.allPokemons.filter((p) => 
            p.createdBd === true
          ),
          loading: false,
        };
      } else {
        return {
          ...state,
          pokemonsLoaded: state.allPokemons,
        };
      }

    case FILTER_POKEMONS_BY_TYPE:
        console.log(action.payload)
      if (action.payload !== 'Types') {
        return {
          ...state,
          pokemonsLoaded: state.allPokemons?.filter((p) =>
            p.types.includes(action.payload)
          ),
          loading: false,
        };
      } else {
        return {
          ...state,
          pokemonsLoaded: state.allPokemons,
        };
      }

    case FILTER_POKEMONS_ALPHABETICALLY:
        if(action.payload === 'a-z'){
            return {
                ...state,
                pokemonsLoaded: state.pokemonsLoaded.sort((a, b)=>{
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                })
            }
        }else if(action.payload === 'z-a'){
            return {
                ...state,
                pokemonsLoaded: state.pokemonsLoaded.sort((a, b)=>{
                    if (a.name > b.name) return -1;
                    if (a.name < b.name) return 1;
                    return 0;
                })
            }
        }else{
            return {
                ...state,
                pokemonsLoaded: state.allPokemons,
            }
        }

        case FILTER_POKEMONS_BY_ATTACK:
            if(action.payload === 'asc'){
                return {
                    ...state,
                    pokemonsLoaded: state.pokemonsLoaded.sort((a, b)=>{
                       return a.attack - b.attack
                    })
                }
            }else if(action.payload === 'desc'){
                return {
                    ...state,
                    pokemonsLoaded: state.pokemonsLoaded.sort((a, b)=>{
                        return b.attack - a.attack
                    })
                }
            }else{
                return {
                    ...state,
                    pokemonsLoaded: state.allPokemons,
                }
            }

        case LOADING_TRUE:
            return {
                ...state,
                loading: action.payload
            }

        case LOADING_FALSE:
            return {
                ...state,
                loading: action.payload
            }
            
    default:
      return state;
  }
}
