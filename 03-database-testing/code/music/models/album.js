'use strict';
module.exports = function(sequelize, DataTypes) {
  var album = sequelize.define('album', {
    title: DataTypes.STRING,
    artistId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.album.belongsTo(models.artist);
        models.album.hasMany(models.song);
      }
    }
  });
  return album;
};
