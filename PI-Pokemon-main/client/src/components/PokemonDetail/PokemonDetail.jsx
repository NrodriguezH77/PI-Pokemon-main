import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { emptyDetail, getPokemonDetail } from "../../redux/actions";
import logo from "../../assets/img/pokemon-logo-png-0.png";
import atras from "../../assets/img/go-back256_24856.png";
import style from "./PokemonDetail.module.css";

export default function PokemonDetail(props) {
  const id = props.match.params.id;
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemonDetail);
  useEffect(() => {
    dispatch(getPokemonDetail(id));
    return () => dispatch(emptyDetail())
  }, []);

  function goToBack() {
    props.history.goBack();
  }
  return (
    <div className={style.padre}>
      <div className={style.header}>
        <Link to={"/home"}>
          <img className={style.logo} src={logo} alt="logo" />
        </Link>
      </div>

      <div className={style.allInfo}>
        <div className={style.detail}>
                <img src={atras} width="50" alt="atrás" onClick={goToBack} />
                <h1 className={style.name}>{pokemon.name}</h1>
            
                <div className={style.detailInfo}>
                    <div className={style.info}>
                        <div>
                            <h2>Infomación</h2>
                            <p>ID: {pokemon.id}</p>
                            <p>Tipos: {pokemon.types}</p>
                            <p>Peso: {pokemon.weight} Kgs</p>
                            <p>Altura: {pokemon.height} Cms</p>
                        </div>
                        
                        <div>
                            <h2 className={style.tittle}>Estadisticas</h2>
                            <p>HP: {pokemon.hp}</p>
                            <p>Ataque: {pokemon.attack}</p>
                            <p>Velocidad: {pokemon.speed}</p>
                            <p>Defensa: {pokemon.defense}</p>
                        </div>

                       
                    </div>
                    <img
                    className={style.imgDetail}
                    src={pokemon.image}
                    alt="Img not found"
                    />
                </div>
        </div>
      </div>
    </div>
  );
}
