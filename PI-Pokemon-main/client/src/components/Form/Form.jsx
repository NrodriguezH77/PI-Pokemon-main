import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import validate from "../../inputValidate";
import { getTypes, postPokemon } from "../../redux/actions";
import style from "./Form.module.css";
export default function Form() {
  const [input, setInput] = useState({
    name: "",
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

  function handleInputChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "types") {
      setInput({
        ...input,
        [name]: [...input.types, value],
      });
    } else {
      setInput({
        ...input,
        [name]: value,
      });
    }
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
    console.log(e.target.name);
  }

  function addTypes(type) {
    if (input.types.indexOf(type) !== -1) {
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
    console.log("se llamo a la funcion create pokemon en form");
    dispatch(postPokemon(input));
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      types: [],
    });
  }

  useEffect(() => {
    dispatch(getTypes());
  }, []);

  return (
    <div>
      <form className={style.form} onSubmit={handleSubmit} name="form">
        <div className={style.inputsForm}>
          <div>
            <div>
              <label for="">Nombre:* </label>
              <div className={style.kg}>
                <input
                  className={style.input}
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                  placeholder="Pokemon"
                  required
                />
              </div>
              {error.name && <p className={style.error}>{error.name}</p>}
            </div>
            <div>
              <label for="">Hp: </label>
              <input
                className={style.input}
                type="text"
                name="hp"
                value={input.hp}
                onChange={handleInputChange}
                placeholder=""
              />
              {error.hp && <p className={style.error}>{error.hp}</p>}
            </div>
            <div>
              <label for="">Attack: </label>
              <input
                className={style.input}
                type="text"
                name="attack"
                value={input.attack}
                onChange={handleInputChange}
                placeholder=""
              />
              {error.attack && <p className={style.error}>{error.attack}</p>}
            </div>
          </div>

          <div>
            <div>
              <label for="">Speed</label>
              <input
                className={style.input}
                type="text"
                name="speed"
                value={input.speed}
                onChange={handleInputChange}
                placeholder=""
              />
              {error.speed && <p className={style.error}>{error.speed}</p>}
            </div>
            <div>
              <label for="">Defense</label>
              <input
                className={style.input}
                type="text"
                name="defense"
                value={input.defense}
                onChange={handleInputChange}
                placeholder=""
              />
              {error.defense && <p className={style.error}>{error.defense}</p>}
            </div>
            <div>
              <label for="">Height</label>
              <input
                className={style.input}
                type="text"
                name="height"
                value={input.height}
                onChange={handleInputChange}
                placeholder=""
              />
              {error.height && <p className={style.error}>{error.height}</p>}
            </div>
            <div>
              <label for="">Weight</label>
              <input
                className={style.input}
                type="text"
                name="weight"
                value={input.weight}
                onChange={handleInputChange}
                placeholder=""
              />
              {error.weight && <p className={style.error}>{error.weight}</p>}
            </div>
            <div>
              <label for="">Types: </label>
              {types.map((ele) => {
                return (
                  <button
                    type="button"
                    key={ele.id}
                    onClick={() => addTypes(ele.id)}
                  >
                    {ele.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <input
          className={style.btn}
          id="btn"
          name="btn"
          type="submit"
          value="CREAR"
        />
      </form>
    </div>
  );
}
