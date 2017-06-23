'use strict';
module.exports = function(sequelize, DataTypes) {
  var foo = sequelize.define('foo', {
    bar: DataTypes.STRING,
    artistId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return foo;
};