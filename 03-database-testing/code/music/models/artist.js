'use strict';
module.exports = function(sequelize, DataTypes) {
  var artist = sequelize.define('artist', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.artist.hasMany(models.album);
      }
    }
  });
  return artist;
};
