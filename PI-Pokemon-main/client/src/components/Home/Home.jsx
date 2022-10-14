import React, { useEffect, useState } from 'react';
import style from './Home.module.css'
import Cards from '../Cards/Cards'
import NavBar from '../NavBar/NavBar'
import Pagination from '../Pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons, loadingTrue } from '../../redux/actions';
import loaderGif from '../../assets/img/ball-pokemon.gif'
import loaderGif2 from '../../assets/img/pokeaball.gif'
import Header from '../Header/Header';
import Loading from '../Loading/Loading'

export default function Home() {
    const [state, setState] = useState(''); //estado para que se rerenderice el componente
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(12);
    const pokemons = useSelector(state => state.pokemonsLoaded)
    let loading = useSelector(state => state.loading);

    const indexOfLastPage = currentPage * postPerPage;
    const indexOfFirstPage = indexOfLastPage - postPerPage;
    const currentPosts = pokemons.slice(indexOfFirstPage, indexOfLastPage)

    const dispatch = useDispatch()
    useEffect(() => {
        //dispatch(loadingTrue())
        dispatch(getAllPokemons())
    }, [])

    function actualizarEstado(value){
        setState(value)
    }

    function handdlePages(page){
        setCurrentPage(page);
    }

    function refresh(){
        dispatch(getAllPokemons())
        dispatch(loadingTrue())
        setCurrentPage(1)
    }
    
    return ( 
        <div className={style.padre}>
            <Header refresh={refresh}/>
            <NavBar actualizarEstado = {actualizarEstado} setCurrentPage = {setCurrentPage}/>
            {!loading && <Pagination currentPage={currentPage} postPerPage={postPerPage} totalPost={pokemons.length}  handdlePages={handdlePages}/>}
            {loading ? <center>
                <Loading/>
            </center> : <Cards pokemons={currentPosts}/>}
            
        </div>
     );
}
