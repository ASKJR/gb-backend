'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    cpf: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  }, {
    timestamps: false,
    freezeTableName: true,
    tableName: 'users'
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};