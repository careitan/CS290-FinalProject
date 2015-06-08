<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

if (isset($_POST)) {
	require_once '../conn/MySQLOSUDB.php';

	$FN = htmlspecialchars($_POST["fn_input"]);
	$LN = htmlspecialchars($_POST["ln_input"]);
	$EMAIL = htmlspecialchars($_POST["email_input"]);
	$TEL = htmlspecialchars($_POST["phone_input"]);
	$UID = htmlspecialchars($_POST["uid_input"]);
	$PWD = htmlspecialchars($_POST["Password_input"]);
	$AlertMessage = "";

// Input Validation Check
// REF: http://www.phpf1.com/tutorial/php-regular-expression.html
	$patternSTR = "/^[a-zA-Z0-9._-]$/";
	$patternEmail = "/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/";
	$patternPhone = "/^[0-9._-]$/";

	if (!preg_match($patternSTR, $UID)) {
		$AlertMessage += "User Name field has some invalid characters.\n";
	}
	if (!preg_match($patternSTR, $FN)) {
		$AlertMessage += "First Name field has some invalid characters.\n";
	}
	if (!preg_match($patternSTR, $LN)) {
		$AlertMessage += "Last Name field has some invalid characters.\n";
	}
	if (!preg_match($patternEmail, $EMAIL)) {
		$AlertMessage += "Email field has some invalid characters.\n";
	}
	if (!preg_match($patternPhone, $TEL)) {
		$AlertMessage += "Phone field has some invalid characters.\n";
	}

	// Test for No Alert Messages - Assume good inputs.
	if (trim($AlertMessage)==='' ) {

		$TSQL = 'INSERT INTO users (FN, LN, phone, email, uname, pwd) 
		VALUES (?, ?, ?, ?, ?, ?)';

		$stmnt = $mysqli->prepare($TSQL);
		if ($mysqli->connect_errno) {
			echo 'MySQL Object Error on Prepare Category Lookup: '.$mysqli->connect_errno.' '.
			$mysqli->connect_error;
		}

		$stmnt->bind_param("ssssss", $FN, $LN, $TEL, $EMAIL, $UID, $PWD);
		$stmnt->execute();

		$stmnt->close();
		$mysqli->close();
	} else {
		// Return Messageto client of failure to process inputs.
		echo $AlertMessage;
	}
}

flush();
header("Location: http://web.engr.oregonstate.edu/~reitanc/CS290-FinalProject/index.html");
exit();