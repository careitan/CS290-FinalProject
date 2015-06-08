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
}

flush();
header("Location: http://web.engr.oregonstate.edu/~reitanc/CS290-FinalProject/index.html");
exit();