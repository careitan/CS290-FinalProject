<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

if (isset($_POST)) {
	require_once 'conn/MySQLOSUDB.php';

	$TSQL = 'SELECT NOT EXISTS (SELECT * FROM users WHERE uname=?) AS Result';

	$stmnt = $mysqli->prepare($TSQL);
	if ($mysqli->connect_errno) {
		echo 'MySQL Object Error on Prepare Category Lookup: '.$mysqli->connect_errno.' '.
		$mysqli->connect_error;
	}

// Input Validation
	if (!$_POST['username']) {
		echo 'Form POST ERROR proposed username not populated.';
		sleep(10);
	}else {
		$InParam = htmlspecialchars($_POST['username']);
		$stmnt->bind_param("s", $InParam);
		$stmnt->execute();
		$stmnt->bind_result($output);

		if (!$stmnt) {
			echo 'MySQL Statement failed on SELECT Categories: '.$stmnt->mysql_errno().' '.
			$stmnt->error();
		} else {

			while ($stmnt->fetch()){
				/*echo 'Value of output variable = '.$output;*/
				switch ($output) {
					case 0:
					echo json_encode(false);
					/*echo 'Value of output variable set by Switch (0)';*/
					break;
					case 1:
					echo json_encode(true);
					break;					
					default:
					echo json_encode(false);
					/*echo 'Value of output variable set by Switch (Default)';*/
					break;
				}
			}
			$stmnt->close();
			$mysqli->close();
		}
	}
}
?>