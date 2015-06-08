// Javascript Library of Function used with CS290 Final Project
// Author: Craig Allan Reitan & others as attributed.
// Users are free to use these functions in the library without modifications
// Do not modifiy this header section of the file.

// BEGIN UTILITY AND HELPER FUNCTIONS
function RegExStringChar(TstVar) {
// Check for invalid characters prior to submitting Form.
// Acceptable characters for fields will be: A-Z, a-z, 0-9, -, and _
// REF: http://stackoverflow.com/questions/7958718/javascript-regex-to-return-if-string-contains-characters-that-are-not-in-the-reg
  return TstVar.match(/[^A-Za-z0-9\-_]/);
}

function RegExPhoneChar(TstVar) {
// Check for invalid characters prior to submitting Form.
// Acceptable characters for fields will be: 0-9, -, and +
// REF: http://stackoverflow.com/questions/7958718/javascript-regex-to-return-if-string-contains-characters-that-are-not-in-the-reg
// Refactored by Allan Reitan to match phone number patterns.
  return TstVar.match(/[^0-9\-+]/);
}
// END UTILITY AND HELPER FUNCTIONS

// METHOD FUNCTIONS FOR USE ON A WEB FORM
function ajaxRequest(URL, Type, Parameters) {
// Populating a null RetVal object.
// https://piazza.com/class/i0j5uszbfur1jw?cid=238
// Student Johnathan Moore
var RetVal = {};
var blnSuccess;
var intCode = 0;
var codeDetailString = '';
var responseString = '';
var Param;
var URLParams = [];
var req = new XMLHttpRequest();
if (!req) {
  throw 'Unable to create HTTPRequest';
}

// Set Default value of Success Flag.
blnSuccess = true;

if (Type !== 'GET' && Type !== 'POST') {
  RetVal.success = false;
  RetVal.code = 1;
  RetVal.codeDetail = 'Syntax Error - Populating Type [GET | POST]';

} else if (Parameters === null) {
  RetVal.success = false;
  RetVal.code = 3;
  RetVal.codeDetail = 'Parameters are not populated.';
} else {
// Setup the URLParams based off of type of Form.
for (var Key in Parameters) {
  if (Parameters.hasOwnProperty(Key)) {
    if (typeof (Parameters[Key]) !== 'string' && blnSuccess) {
      RetVal.success = false;
      RetVal.code = 5;
      RetVal.codeDetail = 'Parameter[' + i + '] is not a string.';

    } else {
      Param = encodeURIComponent(Key) + '=' +
      encodeURIComponent(Parameters[Key]);
      URLParams.push(Param);
    }
  }
}

// Prepare the WebRequest based on the type of method we are using
if (Type === 'GET') {
  req.open('GET', URL + '?' + URLParams.join('&'), true);
  req.send(null);
} else {
// Setting up for POST
req.open('POST', URL, true);
req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
req.send(URLParams.join('&'));
}
}

// Setup the Async or end state to catch the output
if (blnSuccess) {
  req.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status !== 200) {
        RetVal.success = false;
      } else {
        RetVal.success = true;
      }

      RetVal.code = this.status;
      RetVal.codeDetail = this.responseText;
      RetVal.response = this.response;
    }
  };

  if (!RetVal.code) {
    RetVal.code = req.status;
    RetVal.codeDetail = req.responseText;
    RetVal.response = req.response;
  }

  return RetVal;
} else {
  return RetVal;
}
}

// FUNCTIONS CALLED FROM WEB APP OR FORMS
function Login(){
  var UID = document.getElementById('uid');
  var PWD = document.getElementById('pwd');


}

