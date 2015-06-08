// Javascript Library of Function used with CS290 Final Project
// Author: Craig Allan Reitan & others as attributed.
// Users are free to use these functions in the library without modifications
// Do not modifiy this header section of the file.

// BEGIN UTILITY AND HELPER FUNCTIONS
// Sleeper Function to pause execution while waiting for a timer.
function pause_exec(ms)
{
	var date = new Date();
	var curDate = null;
	
	do { curDate = new Date(); }
	while(curDate-date < ms);
}

function RegExStringChar(TstVar) {
// Check for invalid characters prior to submitting Form.
// Acceptable characters for fields will be: A-Z, a-z, 0-9, -, and _
// REF: http://stackoverflow.com/questions/7958718/javascript-regex-to-return-if-string-contains-characters-that-are-not-in-the-reg
  return TstVar.match(/[^A-Za-z0-9\-_]/);
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
  var TstString2 = TstVar.substring(TstVar.indexOf("@"), TstVar.length);
  var TstString3 = TstString2.substring(0, TstString2.indexOf("."));

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
  return TstVar.match(/[^0-9\-+]/);
}

function localStorageExists() {
  var Sample;
  var OutputBox = "Hello World";

  // if (OutputBox !== null) {
  //   OutputBox.innerHTML = 'Testing LS';
  // } else {
  //   return false;
  // }

  try {
    localStorage.setItem('TestLS', OutputBox);
    Sample = localStorage.getItem('TestLS');
  } catch (e) {
    return false;
  }

  if (Sample === 'Hello World') {
    return true;
  } else {
    return false;
  }
}
// END UTILITY AND HELPER FUNCTIONS

// METHOD FUNCTIONS FOR USE ON A WEB FORM
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
//blnSuccess = true;

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
// Prepare the Web Request with the Call Back processing function.
// req.onreadystatechange = ProcessContents;

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

if (!Async) {
	if (!RetVal.code) {
		RetVal.code = req.status;
		RetVal.codeDetail = req.responseText;
		RetVal.response = req.response;
		return RetVal;
	}
};

// Setup the Async or end state to catch the output
//if (blnSuccess) {
	req.onreadystatechange = function ProcessContents() {
		//function ProcessContents() {
			if (this.readyState === 4) {
				if (this.status !== 200) {
					RetVal.success = false;
				} else {
					RetVal.success = true;
				}

				RetVal.code = this.status;
				RetVal.codeDetail = this.responseText;
				//alert(RetVal.codeDetail);
				RetVal.response = this.response;
			}
//		};
return RetVal;
};

//} else {
// 	return RetVal;
// }
}

// FUNCTIONS CALLED FROM WEB APP OR FORMS
function Login() {
	var UID = document.userlogin.user_input.value;
	var PWD = document.userlogin.password_input.value;

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

  var URL = arraytext + "sprocs/Login.php"
  var Param = {'user':UID, 'password':PWD};
  
  //var Return = ajaxRequest(URL, 'POST', Param, true);
  var Return = ajaxRequest(URL, 'POST', Param, false);
  
  // for (var i = 0; i <= 4; i++) {
  // 	pause_exec(1000);
  // }

  if (Return.codeDetail > 0) {
  	// Process the successful login condition.
  	if (localStorageExists()) {
  	// Need to write the local values into local storage for the Login return value.
  	var Results = JSON.parse(Return.response);
  	localStorage.setItem('CS290FPUserName', UID);
  	localStorage.setItem('CS290FPUserID', Results.codeDetail);
  	localStorage.setItem('CS290FPLoggedOn', "true");
  	window.location.href = arraytext + "home.html";
  	}
	} else {
  	// Process the Sorry no login.
  	var OutputBox = document.getElementById('outputText');
  	if (OutputBox !== null) {
  		OutputBox.innerHTML = "Login Unsuccessful!";
  		OutputBox.style.font.color = "red";

  		// Clear out the login boxes and let them try again.
  		document.getElementById('uid').value = "";
  		document.getElementById('pwd').value = "";
  	};
  };
}

function LoginValidation() {
	var UID = document.getElementById('uid').value;
  var PWD = document.getElementById('pwd').value;

  if (UID && UID.length > 0 && PWD && PWD.length > 0) {
  	document.getElementById('UserLogin').disabled = false;
  } else {
  	document.getElementById('UserLogin').disabled = true;
  };

	return;
}