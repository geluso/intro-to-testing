'use strict';
module.exports = function(sequelize, DataTypes) {
  var song = sequelize.define('song', {
    title: DataTypes.STRING,
    albumId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.song.belongsTo(models.album);
      }
    }
  });
  return song;
};
