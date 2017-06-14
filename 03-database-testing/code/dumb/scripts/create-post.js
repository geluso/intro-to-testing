var db = require('../models');
db.author.create({name: "bob"}).then(function(author) {
  db.post.create({title:"Title", content:"blablablabla"}).then(function(post) {
    author.addPost(post);
  });
});
