// Javascript Library of Function used with CS290 Final Project
// Author: Craig Allan Reitan & others as attributed.
// Users are free to use these functions in the library without modifications
// Do not modifiy this header section of the file.

// BEGIN UTILITY AND HELPER FUNCTIONS
function RegExStringChar(TstVar) {
// Check for invalid characters prior to submitting Form.
// Acceptable characters for fields will be: A-Z, a-z, 0-9, -, and _
// REF: http://stackoverflow.com/questions/7958718/javascript-regex-to-return-if-string-contains-characters-that-are-not-in-the-reg
  return TstVar.match(/[^A-Za-z0-9\-_/]);
}

function RegExPhoneChar(TstVar) {
// Check for invalid characters prior to submitting Form.
// Acceptable characters for fields will be: 0-9, -, and +
// REF: http://stackoverflow.com/questions/7958718/javascript-regex-to-return-if-string-contains-characters-that-are-not-in-the-reg
// Refactored by Allan Reitan to match phone number patterns.
  return TstVar.match(/[^0-9\-+/]);
}
// END UTILITY AND HELPER FUNCTIONS

// METHOD FUNCTIONS FOR USE ON A WEB FORM
function Login(){
  var UID = document.getElementById('uid');
  var PWD = document.getElementById('pwd');


}

