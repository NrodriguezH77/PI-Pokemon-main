import React from 'react';

import style from './Cards.module.css';
import Card from '../Card/Card'

export default function Cards({pokemons}) {
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
