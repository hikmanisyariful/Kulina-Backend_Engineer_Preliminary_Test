'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Supplier)
      Product.belongsToMany(models.Cart, {through: models.CartProduct})
    }
  }

  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    SupplierId: DataTypes.INTEGER,
    selling_area: DataTypes.STRING
  },{
    sequelize
  })

  return Product;
};