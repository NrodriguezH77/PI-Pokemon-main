import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/pokemon-logo-png-0.png'
import style from './Header.module.css'

export default function Header({refresh}) {
    
    return (
        <div className={style.padre}>
            <Link to={'/home'}><img width='200' src={logo} alt="logo"/></Link>
            <button className={style.btn} type="button" onClick={refresh}>Refresh</button>
            <Link to={'/createPokemon'}><input  className={style.btn} type="button" value="Crear"/></Link>
        </div>
      );
}

