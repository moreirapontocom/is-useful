<?php
include_once('iu-db.php');

// Retrieve the $_POST vars

( isset($_POST['page']) && !empty($_POST['page']) ) ?
	$page = trim($_POST['page']) :
	$page = '';

( isset($_POST['selectedOption']) && !empty($_POST['selectedOption']) ) ?
	$selectedOption = trim($_POST['selectedOption']) :
	$selectedOption = '';

if ( !empty($page) && !empty($selectedOption) ) {

	( $selectedOption == 'yes' ) ?
		$selectedOption = 1 :
		$selectedOption = 0;

	$query = "INSERT INTO contents_isusefull (page,is_usefull) VALUES ('".$page."','".$selectedOption."')";
	$exec = mysql_query($query) or die (mysql_error());
	if ( $exec ) echo 1;
	else echo 0;

} else
	echo 0;
?>