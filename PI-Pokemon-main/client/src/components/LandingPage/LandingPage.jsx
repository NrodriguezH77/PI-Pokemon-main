import React from 'react';
import { Link } from 'react-router-dom';
import style from './LandingPage.module.css';

export default function LandingPage() {
    return ( 
        <div className={style.padreLanding}>
           <div className='divBtn'>
            <Link to={'/home'}> <input className={style.btn} type="button" value='INGRESAR'/>  </Link>  
            <h1>hol?</h1>
           </div> 
        </div>
     );
}
