module.exports = function(db) {
  console.log("MODELS", db.models);
  console.log("aritst", db.models.artist);
  console.log("adding associations");
  db.artist.hasMany(db.album);
  db.album.belongsTo(db.artist);
  db.album.hasMany(db.song);
  db.song.belongsTo(db.album);
};
