'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Favorite extends Model {}

  Favorite.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    sequelize
  })

  Favorite.associate = function(models) {
    // associations can be defined here
  };
  return Favorite;
};