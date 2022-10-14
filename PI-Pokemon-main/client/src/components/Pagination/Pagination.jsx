import React from 'react';
import style from './Pagination.module.css'
export default  function Pagination({postPerPage, totalPost, handdlePages, currentPage}) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pageNumbers.push(i)
    }
    return ( 
        <div className={style.padre}>
            <nav className={style.nav}>
                <li><button className={style.btn} type="button" onClick={() => currentPage > 1 && handdlePages(currentPage-1)}>Prev</button></li>
                {
                    pageNumbers?.map(page => (
                       <li className={style.li} key={page}>
                         <button className={page === currentPage ? style.x: style.btn} type="button" onClick={() => handdlePages(page)}>{page}</button>
                       </li>
                    ))
                }
                <li><button  className={style.btn} type="button"  onClick={() => currentPage < pageNumbers.length && handdlePages(currentPage+1)}>Next</button></li>
            </nav>
                    
            
        </div>
     );
}

