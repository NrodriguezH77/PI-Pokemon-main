import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonDetail } from '../../redux/actions';
import style  from './PokemonDetail.module.css';

export default function PokemonDetail(props) {
    const id = props.match.params.id;
    const dispatch = useDispatch();
    const pokemon = useSelector(state => state.pokemonDetail)
    useEffect(() => {
        dispatch(getPokemonDetail(id))
    }, [])
    return ( 
        <div>
            <div className={style.detail}>
                <img className={style.imgDetail} src={pokemon.image} alt='Img not found'/>
                <div className={style.info}>
                    <h1>{pokemon.name}</h1>
                    <p>{pokemon.types}</p>
                    <p>ID: {pokemon.id}</p>
                    <h2>Estadisticas</h2>
                    <p>HP: {pokemon.hp}</p>
                    <p>Attack: {pokemon.attack}</p>
                    <p>Speed: {pokemon.speed}</p>
                    <p>Defense: {pokemon.defense}</p>

                    <h2>Medidas</h2>
                    <p>Altura: {pokemon.height}</p>
                    <p>Peso: {pokemon.weight}</p>
                    
                </div>
            </div>
        </div>
     );
}
