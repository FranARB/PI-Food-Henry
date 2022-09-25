const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('diet', {
    id:{   
      type: DataTypes.UUID, //Con este tipo de dato no se repite con el de la API
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {     //nombre de la dieta
      type: DataTypes.STRING,
      //allowNull: false,
    }
  },{timestamps: false});
};