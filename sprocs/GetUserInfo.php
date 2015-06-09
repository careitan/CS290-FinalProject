<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

if (isset($_POST)) {
	require_once '../conn/MySQLOSUDB.php';

	if ($_POST['myprofile'] == 1) {
		$TSQL = 'SELECT id, uname, pwd, `FN`, `LN`, phone, email, publish FROM `users` WHERE (`id`=? OR (FN = ? AND LN = ?))';
	} else if ($_POST['myprofile'] == 0) {
		$TSQL = 'SELECT id, `FN`, `LN`, CASE publish WHEN 1 THEN phone ELSE "" END AS phone, CASE publish WHEN 1 THEN email ELSE "" END AS email, publish FROM `users` WHERE (`id`=? OR (FN = ? AND LN = ?))';
	}

	$PID = "";
	$FN = "";
	$LN = "";
	$profile = "";

	if (isset($_POST['pid'])) {
		$PID = $_POST['pid'];
	}
	if (isset($_POST['fn'])) {
		$FN = $_POST['fn'];
	}
	if (isset($_POST['ln'])) {
		$LN = $_POST['ln'];
	}

	$stmnt = $mysqli->prepare($TSQL);
	if ($mysqli->connect_errno) {
		echo 'MySQL Object Error on Prepare Profile Lookup: '.$mysqli->connect_errno.' '.
		$mysqli->connect_error;
	}

	$stmnt->bind_param("sss", $PID, $FN, $LN);
	$stmnt->execute();
		// Bind results into an array that can be JSON Parsed as output back to client.
		// http://us2.php.net/manual/en/mysqli-stmt.fetch.php
	$stmnt->store_result();
	$meta = $stmnt->result_metadata();
	$bindResult = '$stmnt->bind_result(';
		while ($columnName = $meta->fetch_field()) {
			$bindResult .= '$results["'.$columnName->name.'"],';
		}
		$bindResult = rtrim($bindResult, ',') . ');';

	// executes the bind_result string
eval($bindResult);
$stmnt->fetch();

$stmnt->close();
$mysqli->close();

echo json_encode($results);
}

?>