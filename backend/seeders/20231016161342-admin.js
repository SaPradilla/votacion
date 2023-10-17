const Encrypt = require('../middleware/auth')
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('votantes', [{
       nombre: 'adminUwu',
       apellido:'',
       tipo_documento:'CC',
       documento:'108560',
       numero_celular:'31232747',
       correo:'correo@correo.com',
       contrasena: await Encrypt.cryptPassword('sena123'),
       isMenor:false
     }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('votantes', null, {});
  }
};
