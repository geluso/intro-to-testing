var pass1 = document.getElementById("pass1");
var pass2 = document.getElementById("pass2");
var mustContainExplanation = document.getElementById("must-contain-explanation");
var lengthRequirement = document.getElementById("length-requirement");
var otherRequirements = document.getElementById("other-requirements");

var hasUpperCaseError = document.getElementById("has-uppercase-error");
var hasLowerCaseError = document.getElementById("has-lowercase-error");
var hasSpecialCharsError = document.getElementById("has-special-chars-error");
var hasNumbersError = document.getElementById("has-numbers-error");

var passwordsMatch = document.getElementById("password-match-error");
var passwordSubmit = document.getElementById("password-submit");

pass1.addEventListener("keyup", verifyPasswordRestrictions);
pass2.addEventListener("keyup", verifyPasswordRestrictions);

verifyPasswordRestrictions();

function togglePassFail(element, isPassing) {
  var addClass = "pass";
  var removeClass = "fail";

  if (!isPassing) {
    addClass = "fail";
    removeClass = "pass";
  }

  element.classList.add(addClass);
  element.classList.remove(removeClass);
}

function verifyPasswordRestrictions(ev) {
  var password1 = pass1.value;
  var password2 = pass2.value;

  var test1 = testMeetsLengthRequirement(password1);
  var test2 = testMeetsComplexityRequirements(password1);
  var test3 = testPasswordsMatch(password1, password2);

  passwordSubmit.disabled = !test1 || !test2 || !test3;
}

function testMeetsLengthRequirement(password) {
  var isPassing = password.length >= 8;
  togglePassFail(lengthRequirement, isPassing);
}

function testMeetsComplexityRequirements(password) {
  var numRequirementsPassed = 0;
  if (testHasCapitalLetters(password)) {
    numRequirementsPassed++;
  }
  if (testHasLowerCaseLetters(password)) {
    numRequirementsPassed++;
  }
  if (testHasSpecialCharacters(password)) {
    numRequirementsPassed++;
  }
  if (testHasNumbers(password)) {
    numRequirementsPassed++;
  }
  var isPassing = numRequirementsPassed >= 3;
  togglePassFail(mustContainExplanation, isPassing);
}

function testPasswordsMatch(password1, password2) {
  var isPassing = password1 === password2 && password1.length !== 0;
  togglePassFail(passwordsMatch, isPassing);
}

function isUpperCase(letter) {
  var capitals = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return capitals.includes(letter);
}

function isLowerCase(letter) {
  var capitals = "abcdefghijklmnopqrstuvwxyz";
  return capitals.includes(letter);
}

function isNumber(letter) {
  var capitals = "123456789";
  return capitals.includes(letter);
}

function isSpecialChar(letter) {
  return !isUpperCase(letter) && !isLowerCase(letter) && !isNumber(letter);
}

function testHasCapitalLetters(password) {
  var isPassing = false;
  for (var i = 0; i < password.length; i++) {
    if (isUpperCase(password[i])) {
      isPassing = true;
    }
  };
  togglePassFail(hasUpperCaseError, isPassing);
  return isPassing;
}

function testHasLowerCaseLetters(password) {
  var isPassing = false;
  for (var i = 0; i < password.length; i++) {
    if (isLowerCase(password[i])) {
      isPassing = true;
    }
  };
  togglePassFail(hasLowerCaseError, isPassing);
  return isPassing;
}

function testHasNumbers(password) {
  var isPassing = false;
  for (var i = 0; i < password.length; i++) {
    if (isNumber(password[i])) {
      isPassing = true;
    }
  };
  togglePassFail(hasNumbersError, isPassing);
  return isPassing;
}

function testHasSpecialCharacters(password) {
  var isPassing = false;
  for (var i = 0; i < password.length; i++) {
    if (isSpecialChar(password[i])) {
      isPassing = true;
    }
  };
  togglePassFail(hasSpecialCharsError, isPassing);
  return isPassing;
}

