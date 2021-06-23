'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Show extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Show.init({
    network: DataTypes.STRING,
    title: DataTypes.STRING,
    createdBy: DataTypes.STRING,
    synopsis: DataTypes.STRING,
    seasons: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Show',
  });
  return Show;
};