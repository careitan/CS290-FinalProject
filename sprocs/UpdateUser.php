<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

if (isset($_POST)) {
	require_once '../conn/MySQLOSUDB.php';

	$PID = htmlspecialchars($_POST["pid_input"]);
	$FN = htmlspecialchars($_POST["fn_input"]);
	$LN = htmlspecialchars($_POST["ln_input"]);
	$EMAIL = htmlspecialchars($_POST["email_input"]);
	$TEL = htmlspecialchars($_POST["phone_input"]);
	$PWD = htmlspecialchars($_POST["Password_input"]);
	$PUB = htmlspecialchars($_POST["publish_input"]);
	$AlertMessage = '';

// Input Validation Check
// REF: http://www.phpf1.com/tutorial/php-regular-expression.html
	$patternSTR = "/^[a-zA-Z0-9_-]$/";
	$patternEmail = "/^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z.]{2,5}$/";
	$patternPhone = "/^[0-9._-]$/";

	if (preg_match($patternSTR, $FN)) {
		$AlertMessage += "First Name field has some invalid characters.\n";
	}
	if (preg_match($patternSTR, $LN)) {
		$AlertMessage += "Last Name field has some invalid characters.\n";
	}
	if (preg_match($patternSTR, $PWD)) {
		$AlertMessage += "Last Name field has some invalid characters.\n";
	}
	if (preg_match($patternEmail, $EMAIL)) {
		$AlertMessage += "Email field has some invalid characters.\n";
	}
	if (preg_match($patternPhone, $TEL)) {
		$AlertMessage += "Phone field has some invalid characters.\n";
	}

	// Test for No Alert Messages - Assume good inputs.
	if (isset($AlertMessage) || trim($AlertMessage)==='' || strlen(trim($AlertMessage)) == 0) {

		$TSQL = 'UPDATE`users` SET pwd = ?, FN = ?, LN = ?, phone = ?, email = ?, publish = ? WHERE id=?';

		$stmnt = $mysqli->prepare($TSQL);
		if ($mysqli->connect_errno) {
			echo 'MySQL Object Error on Prepare User Profile Update: '.$mysqli->connect_errno.' '.
			$mysqli->connect_error;
		}

		$stmnt->bind_param("sssssii", $PWD, $FN, $LN, $TEL, $EMAIL, $PUB, $PID);
		$stmnt->execute();

		$stmnt->close();
		$mysqli->close();

		flush();
		header("Location: http://web.engr.oregonstate.edu/~reitanc/CS290-FinalProject/profile.html");
		exit();
	} else {
		// Return Message to client of failure to process inputs.
		exit($AlertMessage);
	}
} else {
		// Return POST not Set
		exit("POST Not Set for Form.");
}


}