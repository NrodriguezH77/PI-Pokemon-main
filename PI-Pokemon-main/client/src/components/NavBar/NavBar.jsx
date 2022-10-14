import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterPokemonsAlphabetically, filterPokemonsByAttack, filterPokemonsByType, filterPokemonsCreated, getPokemonByName, getTypes } from '../../redux/actions';
import style from './NavBar.module.css'

export default function NavBar({actualizarEstado, setCurrentPage}) {
    const [name, setName] = useState('');
    const [state, setState] = useState('');
    const types = useSelector(state => state.pokemonTypes)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTypes())
    }, [])

    function handleChange(e){
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getPokemonByName(name));
        setName('');
    }

    function filterPokemons(e){
        const select = e.target.name;
        const value = e.target.value;
        //console.log(select, '  ', value)
        if(select === 'created'){
            dispatch(filterPokemonsCreated(value))
            setCurrentPage(1);
        }else if(select === 'types'){
            dispatch(filterPokemonsByType(value))
            setCurrentPage(1);
        }else if(select === 'orderAlphabetical'){
            dispatch(filterPokemonsAlphabetically(value))
            actualizarEstado(value)
            setCurrentPage(1);
        }else if(select === 'orderByAttack'){
            dispatch(filterPokemonsByAttack(value))
            actualizarEstado(value)
            setCurrentPage(1);
        }
    }
    return ( <div>
        
        <div className={style.padre}>

                <div>
                    <form onSubmit={(e) => handleSubmit(e)} name='form'>
                    <input className={style.inputText} type="text" name='name' value={name} autoComplete onChange={handleChange} />
                    <input className={style.inputSubmit} type="submit" value='Buscar'/>
                    </form>
                </div>
                <select className={style.select} name="created" onChange={filterPokemons}>
                  <option selected >Creados/API</option>
                  <option value="bd">Creados</option> {/* key */}
                  <option value="api">API</option>
                </select>

                <select className={style.select} name="types" onChange={filterPokemons}>
                  <option selected >Types</option>
                  {
                    types?.map(t => {
                        return (
                             <option key={t.id} value={t.name}>{t.name}</option> 
                        )
                    })
                  }
                </select>

                <select className={style.select} name="orderAlphabetical" onChange={filterPokemons}>
                  <option selected >Orden alfabético</option>
                  <option value="a-z">A-Z</option>
                  <option value="z-a">Z-A</option>
                </select>

                <select className={style.select} name="orderByAttack" onChange={filterPokemons}>
                  <option selected >Orden por ataque</option>
                  <option value="asc">Ascendente</option>
                  <option value="desc">Descendente</option>
                </select>

        </div>
        <hr/>
    </div>
     );
}
