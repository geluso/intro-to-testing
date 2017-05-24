var db = require("../models");
db.grade.create({
  name: 'Bart',
  grade: 75
}).then(function(data) {
  return db.grade.create({
    name: 'Lisa',
    grade: 98
  });
}).then(function(data) {
  return db.grade.create({
    name: 'Milhouse',
    grade: 82
  });
}).then(function(data) {
  return db.grade.create({
    name: 'Dolph',
    grade: 22
  });
}).then(function(data) {
  return db.grade.create({
    name: 'Ralph',
    grade: 64
  });
});
