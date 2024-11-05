const {Model, Sequelize, DataTypes, db} = require('../db');

// TODO - define the Musician model

class Musician extends Model {}

// Initialize the Musician model
Musician.init(
  {
    // Define the properties
    name: {
      type: DataTypes.STRING, // Define name as a string
      allowNull: false,       // Name cannot be null
    },
    instrument: {
      type: DataTypes.STRING, // Define instrument as a string
      allowNull: false,       // Instrument cannot be null
    },
  },
  {
    sequelize: db,          // Pass the database connection
    modelName: 'Musician',   // Define the model name as "Musician"
  }
);


module.exports = {
    Musician
};