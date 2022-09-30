import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css'

export default function Card({id, name, types, image}) {
    return ( 
        <div className={style.padre}>
            <img className={style.imgCard} src={image} alt={name}/>
            <div>
                <p><Link to={`/detail/${id}`}>{name}</Link></p>
                <p>{types}</p>
            </div>
        </div>
     );
}

