'use strict';
var faker = require('faker');

const randomData = (rows) => {
  let data = [];
  for (let index = 0; index < rows; index++) {
      let name  = faker.name.findName();
      let cpf   = '000.000.000-00';
      let email = faker.internet.email();
      let password = faker.internet.password();
      data.push({
          name,
          cpf,
          email,
          password,
          created_at: new Date(),
          updated_at: new Date()
      });
  }
  return data;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', randomData(10), {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};