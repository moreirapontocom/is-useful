<?php session_start();

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

	// Check if user already voted
	$user_hash = $_SESSION['REMOTE_ADDR'].session_id();

	$query_check = "SELECT COUNT(id) AS vote FROM contents_isusefull WHERE user_hash = '".$user_hash."' LIMIT 1";
	$sql_exec = mysql_query($query_check) or die (mysql_error());
	if ( $sql_exec ) {

		$rs_check = mysql_fetch_array($sql_exec) or die (mysql_error());
		if ( $rs_check['vote'] == 0 ) {

			$query = "INSERT INTO contents_isusefull (page,is_usefull,user_hash) VALUES ('".$page."','".$selectedOption."','".$user_hash."')";
			$exec = mysql_query($query) or die (mysql_error());
			if ( $exec ) echo 1;
			else echo 0;

		} else
			echo 2;

	} else
		echo 0;

} else
	echo 0;
?>