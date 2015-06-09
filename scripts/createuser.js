// Javascript Library functions for CS290 Final Project
// Web Form to create New Users in the Web Tool Design
// Author: Craig Allan Reitan and others as atrributed.
// Users are free to reuse this library as-is without modifications.

// BEGIN UTILITY AND HELPER FUNCTIONS
function RegExStringChar(TstVar) {
// Check for invalid characters prior to submitting Form.
// Acceptable characters for fields will be: A-Z, a-z, 0-9, -, and _
// REF: http://stackoverflow.com/questions/7958718/javascript-regex-to-return-if-string-contains-characters-that-are-not-in-the-reg
  return TstVar.match(/[^A-Za-z0-9]/);
}

function RegExEmailChar(TstVar) {
// Check for invalid characters prior to submitting Form.
// Acceptable characters for fields will be: A-Z, a-z, 0-9, -, and _
// REF: http://www.zparacha.com/validate-email-address-using-javascript-regular-expression/
  return TstVar.match(/^[a-zA-Z0-9._-]+\@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
}

function ValidateEmailString(TstVar) {
  // Just a fast on the fly way to determine if the string has a @ and a . in the second half.
  var TstString1 = TstVar.substring(0, TstVar.indexOf("@"));
  var TstString2 = TstVar.substring(TstVar.indexOf("@") + 1, TstVar.length);
  var TstString3 = TstString2.substring(TstString2.indexOf(".")+1, TstString2.length);

  if (TstString1 && TstString1.length > 0 &&
    TstString2 && TstString2.length > 0 &&
    TstString3 && TstString3.length > 0) {
    return true;
  } else {
    return false;
  }

}

function RegExPhoneChar(TstVar) {
// Check for invalid characters prior to submitting Form.
// Acceptable characters for fields will be: 0-9, -, and +
// REF: http://stackoverflow.com/questions/7958718/javascript-regex-to-return-if-string-contains-characters-that-are-not-in-the-reg
// Refactored by Allan Reitan to match phone number patterns.
  return TstVar.match(/[^0-9-+]/);
}
// END UTILITY AND HELPER FUNCTIONS

// METHOD FUNCTIONS FOR USE ON WEB FORM
function ValidNewName(NewValue) {
  <!-- Original: Dan Worsham -->

  <!-- This script and many more are available free online at -->
  <!-- The JavaScript Source!! http://javascript.internet.com -->

  <!-- Begin
  var myloc = window.location.href;
  var locarray = myloc.split("/");
  delete locarray[(locarray.length-1)];
  var arraytext = locarray.join("/");
  //alert(arraytext);
  //document.location=arraytext;
  // End -->

  var URL = arraytext + "ValidNewName.php";
  var parameters = {'username': NewValue};
  var Return = ajaxRequest(URL, 'POST', parameters);
  var OutputBox = document.getElementById('outputText');

  if (Return.response === 'false') {
    OutputBox.innerHTML = 'Username is already in use.';
    OutputBox.style.font.color = 'red';
  }
}

function ajaxRequest(URL, Type, Parameters, Async) {
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
  req.open('GET', URL + '?' + URLParams.join('&'), Async);
  req.send(null);
} else {
// Setting up for POST
req.open('POST', URL, Async);
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

function UserValidation() {
  // Ref: http://www.htmlcodetutorial.com/forms/_FORM_onSubmit.html
  var TstUsrName = document.createuser.uid_input.value;
  var TstPwd = document.createuser.Password_input.value;
  var TstFN = document.createuser.fn_input.value;
  var TstLN = document.createuser.ln_input.value;
  var TstEmail = document.createuser.email_input.value;
  var TstPhone = document.createuser.phone_input.value;
  var AlertMessage = '';
  var ReturnVal;
  var OutputBox = document.getElementById('outputText');

// Check for invalid characters prior to submitting Form.
// Acceptable characters for fields will be: A-Z, a-z, 0-9, -, and _
// Acceptable characters for the phone field will be +, -, 0-9
  if (RegExStringChar(TstUsrName) && TstUsrName.length > 0) {
    AlertMessage += "<br>User Name contains invalid characters.";
  };
  if (RegExStringChar(TstPwd) && TstPwd.length > 0) {
    AlertMessage += "<br>Password contains invalid characters.";
  };
  if (RegExStringChar(TstFN) && TstFN.length > 0) {
    AlertMessage += "<br>First Name contains invalid characters.";
  };
  if (RegExStringChar(TstLN) && TstLN.length > 0) {
    AlertMessage += "<br>Last Name contains invalid characters.";
  };
  if (!ValidateEmailString(TstEmail)) {
    AlertMessage += "<br>E-mail contains invalid characters.";
  };
  if (RegExPhoneChar(TstPhone) && TstPhone.length > 0) {
    AlertMessage += "<br>Phone contains invalid characters.";
  };

// Check for the AlertMessaage to be empty before proceeding.
// REF: http://www.webcosmoforums.com/javascript-ajax/25689-how-check-if-string-null-empty-javascript.html
  if (AlertMessage && AlertMessage!='') {
    OutputBox.innerHTML = AlertMessage;
    OutputBox.style.font.color = "red";
    //alert(AlertMessage);
    document.getElementById('CreateUser').disabled = true;
    ReturnVal = false;
  } else {
    OutputBox.innerHTML = "";
    document.getElementById('CreateUser').disabled = false;
    ReturnVal = true;
  };

  return ReturnVal;
}

function GetUserProfileEdit() {
  var LSRef = localStorageExists();
  var UserPID = 0;
  var Return = {};
  var URL = window.location.href + "sprocs/GetUserInfo.php"

  if (LSRef === true) {
    UserPID = localStorage.getItem('CS290FPUserID');
  };
  var Params = {"myprofile":1, "pid":UserPID};

  Return = ajaxRequest(URL, "POST", Params, false);

  if (Return.codeDetail) {
    var Output = JSON.parse(Return.codeDetail);

    document.createuser.uid_input.value = Output.id;
    document.createuser.uid_input.value = Output.uname;
    document.createuser.Password_input.value = Output.pwd
    document.createuser.fn_input.value = Output.fn;
    document.createuser.ln_input.value = Output.ln;
    document.createuser.email_input.value = Output.email;
    document.createuser.phone_input.value = Output.phone;
    document.createuser.publish_input.checked = Output.publish;
  };
}