var db = require('../models');

db.artist.create({name: "The Beatles"}).then(function(beatles) {
  db.album.create({title: "Sgt. Pepper's Lonely Hearts Club Band"}).then(function(sgtPeppers) {
    beatles.addAlbum(sgtPeppers);
    
    db.song.create({title: "With A Little Help From My Friends"}).then(function(song) {
      sgtPeppers.addSong(song);
    });
    db.song.create({title: "Lucy In The Sky With Diamonds"}).then(function(song) {
      sgtPeppers.addSong(song);
    });
    db.song.create({title: "A Day In The Life"}).then(function(song) {
      sgtPeppers.addSong(song);
    });
  });
  db.album.create({title: "Revolver"}).then(function(revolver) {
    beatles.addAlbum(revolver);
    db.song.create({title: "Taxman"}).then(function(song) {
      revolver.addSong(song);
    });
    db.song.create({title: "Eleanor Rigby"}).then(function(song) {
      revolver.addSong(song);
    });
    db.song.create({title: "She Said, She Said"}).then(function(song) {
      revolver.addSong(song);
    });
  });
});
