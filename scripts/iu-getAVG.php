<?php
include_once('iu-db.php');

( isset($_POST['page']) && !empty($_POST['page']) ) ?
	$page = trim($_POST['page']) :
	$page = '';

if ( !empty($page) ) {

	$query = "
		SELECT
			(SELECT COUNT(id) FROM contents_isusefull WHERE is_usefull = 1) AS avg_yes,
			(SELECT COUNT(id) FROM contents_isusefull WHERE is_usefull = 0) AS avg_no
		FROM contents_isusefull
		WHERE page = '".$page."'
		LIMIT 1";
	$exec = mysql_query($query) or die (mysql_error());
	if ( $exec ) {
		$rs = mysql_fetch_array($exec) or die (mysql_error());
		echo $rs['avg_yes'].'|'.$rs['avg_no'];

	} else echo 0;

} else
	echo 0;
?>