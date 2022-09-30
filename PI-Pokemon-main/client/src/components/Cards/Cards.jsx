import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import style from './Cards.module.css';
import Card from '../Card/Card'

export default function Cards({pokemons}) {
   // const pokemons = useSelector(state => state.pokemonsLoaded)

    return ( 
        <div className={style.padre}>
            {
                pokemons?.map(pokemon => {
                    return (
                        <Card
                            key={pokemon.id}
                            id={pokemon.id}
                            name={pokemon.name}
                            image={pokemon.image}
                            types={pokemon.types}
                        />
                    )
                })
            }
        </div>
     );
}
