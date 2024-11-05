const path = require('path');
const { Sequelize, Model, DataTypes } = require('sequelize');
const {Band} = require ('./models/Band.js')

// TODO - create the new sequelize connection

const db = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'db.sqlite'),
  });



module.exports = {
    Sequelize,
    Model,
    DataTypes,
    db
};
