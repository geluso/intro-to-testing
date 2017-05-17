var pass1 = document.getElementById("pass1");
var pass2 = document.getElementById("pass2");
var lengthRequirement = document.getElementById("length-requirement");
var otherRequirements = document.getElementById("other-requirements");
var passwordsMatch = document.getElementById("password-match-error");
var passwordSubmit = document.getElementById("password-submit");

pass1.addEventListener("keyup", verifyPasswordRestrictions);
pass2.addEventListener("keyup", verifyPasswordRestrictions);

function togglePassFail(element, isPassing) {
  var addClass = "pass";
  var removeClass = "fail";

  console.log("isPassing:", isPassing);

  if (!isPassing) {
    addClass = "fail";
    removeClass = "pass";
  }

  lengthRequirement.classList.add(addClass);
  lengthRequirement.classList.remove(removeClass);
}

function verifyPasswordRestrictions(ev) {
  meetsLengthRequirement();
  meetsComplexityRequirements();
  passwordsMatch();
}

function meetsLengthRequirement() {
  var password = pass1.value;
  var isPassing = password.length >= 8;
  togglePassFail(lengthRequirement, isPassing);
}

function meetsComplexityRequirements() {

}

function passwordsMatch() {

}
