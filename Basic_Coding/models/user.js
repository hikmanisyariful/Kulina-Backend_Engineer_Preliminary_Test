'use strict';
const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Cart)
    }
  }

  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.STRING
  },{
    sequelize,
    hooks: {
      beforeCreate : (user, options) => {
        let password = user.password
        let hash = hashPassword(password)
        user.password = hash
      }
    }
  })
  
  return User;
};