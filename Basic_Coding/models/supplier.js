'use strict';
const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Supplier extends Model {
    static associate(models) {
      Supplier.hasMany(models.Product)
    }
  }

  Supplier.init({
    store_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.STRING
  },{
    sequelize,
    hooks: {
      beforeCreate : (supplier, option) => {
        let password = supplier.password
        let hash = hashPassword(password)
        supplier.password = hash
      }
    }
  })

  return Supplier;
};