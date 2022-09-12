const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Type', {
   id:{
    type: DataTypes.INTEGER,
    autoIcrement: true,
    primaryKey: true,
   },
   name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

  });
};