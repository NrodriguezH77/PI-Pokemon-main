import React from 'react';
import { Link } from 'react-router-dom';
import style from './Card.module.css'

export default function Card({id, name, types, image}) {
    return ( 
        <Link className={style.link} to={`/detail/${id}`}> <div className={style.padre}>
        <div className={style.hijo}>
             <img className={style.imgCard} src={image} alt={name}/>
             <div>
                 <p className={style.p}>{name}</p>
                 <p>{types}</p>
             </div>
        </div>
     </div></Link>
        
     );
}

