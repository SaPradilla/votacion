'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class candidato extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  candidato.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    foto: DataTypes.BLOB,
    biografia: DataTypes.STRING,
    cargo_postulante:DataTypes.ENUM('Alcalde','Gobernador','Junta Comunal','Asamblea','Representante SENA')

  }, {
    sequelize,
    modelName: 'candidato',
  });
  return candidato;
};