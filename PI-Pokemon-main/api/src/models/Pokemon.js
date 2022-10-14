const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    hp: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    attack: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    defense: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    speed: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    height: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    weight: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'https://assets.stickpng.com/images/580b57fcd9996e24bc43c325.png'
    }
  },{
    timestamps: false,
  });
};
