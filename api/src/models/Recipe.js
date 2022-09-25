const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {               //identificación/numero de la receta
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    summary: {          //información de la receta
      type: DataTypes.TEXT,
      allowNull: false,
    },

    title: {                    //nombre de la receta
      type: DataTypes.STRING,
      allowNull: false,
    },

    dishTypes: {             //tipo de plato
      type: DataTypes.TEXT,
    },
    image: {                //imagen de la receta
      type: DataTypes.STRING,
    },
    analyzedInstructions: {           //instrucciones de la receta
      type: DataTypes.TEXT,
    },
    healthScore : {            //que tan sana es la receta
      type: DataTypes.INTEGER,
    }
  },{timestamps: false});
};