import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validate from "../../inputValidate";
import { getTypes, loadingFalse, loadingTrue, postPokemon } from "../../redux/actions";
import style from "./Form.module.css";
import logo from "../../assets/img/pokemon-logo-png-0.png";
import atras from "../../assets/img/go-back256_24856.png";
import Loading from "../Loading/Loading";
export default function Form(props) {
  const [input, setInput] = useState({
    namePokemon: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
  });
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const types = useSelector((state) => state.pokemonTypes);
  const loading = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(loadingFalse())
   
  }, [])


  function handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    
      setInput({
        ...input,
        [name]: value,
      });
    
    setError(
      validate(
        {
          ...input,
          [e.target.name]: e.target.value,
        },
        e
      )
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError(validate(input, e, createPokemon));
  }

  function addTypes(type) {
    if (input.types.includes(type)) {
      setInput({
        ...input,
        types: input.types.filter((t) => t !== type),
      });
    } else {
      setInput({
        ...input,
        types: [...input.types, type],
      });
    }
  }

  function createPokemon() {
    dispatch(loadingTrue())
    dispatch(postPokemon(input));
    setInput({
      namePokemon: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      types: [],
    });
  }

  function goToBack(){
    props.history.goBack()
  }

  useEffect(() => {
    dispatch(getTypes());
  }, []);
  return (
    <div className={style.padre}>
      <div className={style.header}>
        <Link to={"/home"}>
          <img className={style.logoCreate} src={logo} alt="logo" />
        </Link>
      </div>
      <hr/>
      
        {loading ?   
           <center>
            <Loading/>
           </center>
      
         :
          <div className={style.padreCard}>
            <div className={style.cardCreate}>
            <img className={style.atras} src={atras} width="50" alt="atrás" onClick={goToBack}/>

            <form className={style.form} onSubmit={(e) => handleSubmit(e)} name="form">
          <div className={style.inputsForm}>
            <div>
              <div>
                <label className={style.label} for="">Nombre:* </label>
                
                  <input
                    className={style.input}
                    type="text"
                    name="namePokemon"
                    value={input.name}
                    onChange={handleInputChange}
                    placeholder=""
                    autocomplete="off"
                    required
                  />
            
                {error.name && <p className={style.error}>{error.name}</p>}
              </div>
              <div>
                <label className={style.label} for="">Hp: </label>
                <input
                  className={style.input}
                  type="text"
                  name="hp"
                  value={input.hp}
                  onChange={handleInputChange}
                  placeholder=""
                  autocomplete="off"
                />
                {error.hp && <p className={style.error}>{error.hp}</p>}
              </div>
              <div>
                <label className={style.label} for="">Attack: </label>
                <input
                  className={style.input}
                  type="text"
                  name="attack"
                  value={input.attack}
                  onChange={handleInputChange}
                  placeholder=""
                  autocomplete="off"
                />
                {error.attack && <p className={style.error}>{error.attack}</p>}
              </div>
            </div>

            <div>
              <div>
                <label className={style.label} for="">Speed</label>
                <input
                  className={style.input}
                  type="text"
                  name="speed"
                  value={input.speed}
                  onChange={handleInputChange}
                  placeholder=""
                  autocomplete="off"
                />
                {error.speed && <p className={style.error}>{error.speed}</p>}
              </div>
              <div>
                <label className={style.label} for="">Defense</label>
                <input
                  className={style.input}
                  type="text"
                  name="defense"
                  value={input.defense}
                  onChange={handleInputChange}
                  placeholder=""
                  autocomplete="off"
                />
                {error.defense && <p className={style.error}>{error.defense}</p>}
              </div>
              <div>
                <label className={style.label} for="">Height</label>
                <input
                  className={style.input}
                  type="text"
                  name="height"
                  value={input.height}
                  onChange={handleInputChange}
                  placeholder="Cms"
                  autocomplete="off"
                />
                {error.height && <p className={style.error}>{error.height}</p>}
              </div>
              <div>
                <label className={style.label} for="">Weight</label>
                <input
                  className={style.input}
                  type="text"
                  name="weight"
                  value={input.weight}
                  onChange={handleInputChange}
                  placeholder="Kgs"
                  autocomplete="off"
                />
                {error.weight && <p className={style.error}>{error.weight}</p>}
              </div>
              
            </div>
            
        </div>
        <div>
                <label className={style.label} for="">Types: </label>
                {types.map((ele) => {
                  return (
                    <button
                      className={!input.types.includes(ele.id) ? style.btnType : style.btnTypeClick}  
                      type="button"
                      key={ele.id}
                      onClick={() => addTypes(ele.id)}
                    >
                      {ele.name}
                    </button>
                  );
                })}
              </div>
        <button className={style.btn}
          id="btn"
          name="btn"
          type="submit"
          >Crear</button>
        
        </form>
          </div>
          </div>
        }
      
    </div>
  );
}
