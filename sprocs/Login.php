<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

if (isset($_POST)) {
	require_once '../conn/MySQLOSUDB.php';
// Start the Login Process and Set the Session Value.

	$UID = $_POST['user'];
	$PWD = $_POST['password'];
	$SQLOutput;
	$Valid = 0;

	if (isset($UID) && isset($PWD)) {
		$TSQL = 'SELECT MAX(A.id) FROM ((SELECT 0 AS id) UNION ALL (SELECT id FROM users WHERE uname = ? AND pwd = ?)) AS A';

		$stmnt = $mysqli->prepare($TSQL);
		if ($mysqli->connect_errno) {
			echo 'MySQL Object Error on Prepare Category Lookup: '.$mysqli->connect_errno.' '.
			$mysqli->connect_error;
		}

		$stmnt->bind_param("ss", $UID, $PWD);
		$stmnt->execute();

		if (!$stmnt) {
			echo 'MySQL Statement failed on Login: '.$stmnt->mysql_errno().' '.
			$stmnt->error();
		} else {
			$stmnt->bind_result($SQLOutput);
			while($stmnt->fetch()){
			$Valid = $SQLOutput;
			}
		}
		$stmnt->close();
		$mysqli->close();

		if ($Valid > 0) {
			session_start();
			$_SESSION['username']=$UID;
			$_SESSION['userid']=$Valid;
			$_SESSION['loggedin']=true;
			echo $Valid;
			return true;
		} else {
			echo $Valid;
			return false;
		}
	}

}  