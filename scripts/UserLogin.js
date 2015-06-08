// Javascript Library of Function used with CS290 Final Project
// Author: Craig Allan Reitan & others as attributed.
// Users are free to use these functions in the library without modifications
// Do not modifiy this header section of the file.

// UTILITY AND HELPER FUNCTIONS
window.onload = function() {
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

  var OutputBox = document.getElementById('MessageOut');
  var LSVerf = localStorageExists();
  OutputBox.innerHTML = '';

  if (LSVerf === true && OutputBox !== null) {
  	var UserName = localStorage.getItem('CS290FPUserName');
  	var UserID = localStorage.getItem('CS290FPUserID');
  	var LoggedOn = localStorage.getItem('CS290FPLoggedOn');

  	if (UserName === null && UserID === null && LoggedOn === null) {
  		window.location.href = arraytext + "index.html";
  	}

  } else if (LSVerf !== true && OutputBox !== null) {
    OutputBox.innerHTML = 'Local Storage is not available.';
    OutputBox.currentStyle.backgroundColor = red;
    OutputBox.currentStyle.fill = red;
    OutputBox.style.font.fontcolor = white;
    window.location.href = arraytext + "index.html";
  }

}

function localStorageExists() {
  var Sample;
  var OutputBox = document.getElementById('MessageOut');

  if (OutputBox !== null) {
    OutputBox.innerHTML = 'Testing LS';
  } else {
    return false;
  }

  try {
    localStorage.setItem('TestLS', OutputBox.innerHTML);
    Sample = localStorage.getItem('TestLS');
  } catch (e) {
    return false;
  }

  if (Sample === 'Testing LS') {
    return true;
  } else {
    return false;
  }
}