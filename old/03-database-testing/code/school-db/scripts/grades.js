var db = require('../models');

function printGrade(grade) {
  console.log("Created", grade.name, "with", grade.grade);
}

// these statements aren't necessarily executed in order.
db.grade.destroy({where:{}, truncate: true}).then(function() {
  return createGrades();
}).then(function() {
  findAllGrades();
});

function createGrades() {
  // create several characters with grades.
  return db.grade.create({name: "Lisa Simpson", grade: 100}).then(function(grade) {
    printGrade(grade);
  }).then(function() {
    return db.grade.create({name: "Bart Simpson", grade: 62}).then(function(grade) {
      printGrade(grade);
    });
  }).then(function() {
    return db.grade.create({name: "Milhouse", grade: 92}).then(function(grade) {
      printGrade(grade);
    });
  }).then(function() {
    return db.grade.create({name: "Nelson", grade: 34}).then(function(grade) {
      printGrade(grade);
    });
  }).then(function() {
    return db.grade.create({name: "Ralph Wiggum", grade: 80}).then(function(grade) {
      printGrade(grade);
    });
  });
}

function findAllGrades() {
  // verify we can query the database for everyone.
  db.grade.findAll().then(function(grades) {
    // uh oh. there's duplicates in our database.
    console.log("There are", grades.length, "total grades.");
  });
}
