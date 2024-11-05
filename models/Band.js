const {Sequelize, Model, DataTypes, db} = require('../db.js');
const {  } = require('sequelize');


// TODO - define the Band model

class Band extends Model {}

// Initialize the Band model
Band.init(
  {
    // Define the properties
    name: {
      type: DataTypes.STRING, // Define name as a string
      allowNull: false,       // Name cannot be null
    },
    genre: {
      type: DataTypes.STRING, // Define genre as a string
      allowNull: false,       // Genre cannot be null
    },
  },
  {
    sequelize: db,          // Pass the database connection
    modelName: 'Band',      // Define the model name as "Band"
  }
);



module.exports = {
    Band
};