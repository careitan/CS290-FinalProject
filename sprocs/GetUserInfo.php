<?php
error_reporting(E_ALL);
ini_set('display_errors', 'On');

if (isset($_POST)) {
	require_once '../conn/MySQLOSUDB.php';

	$TSQL = 'SELECT id, `FN`, `LN`, CASE publish WHEN 1 THEN phone ELSE "" END AS phone, CASE publish WHEN 1 THEN email ELSE "" END AS email FROM `users` WHERE (`id`=? OR (FN = ? AND LN = ?))';


}