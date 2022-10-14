
export default function validate(input, e, createPokemon) {
    let errors = {};
    let inputName = e.target.name;

    if(inputName === 'namePokemon' || inputName === 'form'){
      if (!input.namePokemon) {
      errors.namePokemon = "El nombre es requerido";
      } else if (!/^[a-zA-Z\s]*$/.test(input.namePokemon)) {
      errors.namePokemon = "Nombre invalido - *Solo letras (A-Z)*";
    }
   }
   
   if(inputName === 'hp' || inputName === 'form'){
    if(input.hp){
        if(!/^\d+$/.test(input.hp) || Number(input.hp) > 100) {
            errors.hp = "*Solo números (0-9) y < 100*";
        }
    }
   }

   if(inputName === 'attack' || inputName === 'form'){
    if(input.attack){
        if(!/^\d+$/.test(input.attack) || Number(input.attack) > 100) {
            errors.attack = "*Solo números (0-9) y < 100*";
        }
    }
   }

   if(inputName === 'speed' || inputName === 'form'){
    if(input.speed){
        if(!/^\d+$/.test(input.speed) || Number(input.speed) > 100) {
            errors.speed = "*Solo números (0-9) y < 100*";
        }
    }
   }

   if(inputName === 'defense' || inputName === 'form'){
    if(input.defense){
        if(!/^\d+$/.test(input.defense) || Number(input.defense) > 100) {
            errors.defense = "*Solo números (0-9) y < 100*";
        }
   }
   }
   
   if(inputName === 'height' || inputName === 'form'){
    if(input.height){
        if(!/^\d+$/.test(input.height) || Number(input.height) > 105) {
            errors.height = "*Solo números (0-9) y < 105*";
        }
    }
   }

   if(inputName === 'weight' || inputName === 'form'){
    if(input.weight){
        if(!/^\d+$/.test(input.weight) || Number(input.weight) > 105) {
            errors.weight = "*Solo números (0-9) y < 105*";
        }
    }
   }

  if(Object.keys(errors).length === 0 && inputName === 'form'){
    createPokemon()
  }

    return errors;
  }