const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
  name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  id:{
      type: DataTypes.INTEGER,
      autoIcrement:true,
      primaryKey: true,
    },
  live:{
      type: DataTypes.INTEGER,
      allowNull:false,
  },
  attack:{
      type:DataTypes.INTEGER,
      allowNull:false,
  },
  Defense:{
      type:DataTypes.INTEGER,
  },
  speed:{
      type:DataTypes.INTEGER,
  },
  height:{
    type: DataTypes.INTEGER,
  },
  weight:{
      type:DataTypes.INTEGER,
  },
  img:{
      type: DataTypes.STRING(1234)
  },
  });
};
