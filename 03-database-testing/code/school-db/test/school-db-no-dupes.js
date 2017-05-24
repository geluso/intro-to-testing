var db = require("../models");
db.grade.findOrCreate({where: {
  name: 'Bart',
  grade: 75
}}).then(function(data) {
  return db.grade.findOrCreate({where: {
    name: 'Lisa',
    grade: 98
  }});
}).then(function(data) {
  return db.grade.findOrCreate({where: {
    name: 'Milhouse',
    grade: 82
  }});
}).then(function(data) {
  return db.grade.findOrCreate({where: {
    name: 'Dolph',
    grade: 22
  }});
}).then(function(data) {
  return db.grade.findOrCreate({where: {
    name: 'Ralph',
    grade: 64
  }});
});
