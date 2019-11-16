'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    cod: DataTypes.STRING,
    user_id: DataTypes.BIGINT,
    value: DataTypes.DOUBLE,
    date: DataTypes.DATEONLY,
    status: DataTypes.TINYINT,
  }, {
    freezeTableName: true,
    tableName: 'orders'
  });
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};