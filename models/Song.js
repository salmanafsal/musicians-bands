const {Model, Sequelize, DataTypes, db} = require('../db');

// TODO - define the Song model
class Song extends Model {}

// Initialize the Song model
Song.init(
  {
    // Define the properties
    title: {
      type: DataTypes.STRING, // Define title as a string
      allowNull: false,       // Title cannot be null
    },
    year: {
      type: DataTypes.INTEGER, // Define year as a number (integer)
      allowNull: false,        // Year cannot be null
    },
    length: {
      type: DataTypes.INTEGER, // Define length as a number (integer)
      allowNull: false,        // Length cannot be null
    },
  },
  {
    sequelize: db,          // Pass the database connection
    modelName: 'Song',      // Define the model name as "Song"
  }
);

module.exports = {
    Song
};