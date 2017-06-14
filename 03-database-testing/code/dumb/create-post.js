var db = require('./models');
db.author.create({name: "bob"}).then(function(author) {
  author = author.get();
  console.log("GOT", author);
  author.createPost({title:"Title", content:"blablablabla"}).then(function(post) {
  });
});
