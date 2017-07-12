<?php
session_start();
include ('Bee.php');

if(isset($_REQUEST['a']) && isset($_REQUEST['b'])) {
	$a = $_REQUEST['a'];
 	$b = $_REQUEST['b'];

	$bee = new Bee();
	$bee->calculate($a,$b);

	$myJSON = json_encode($_SESSION);
	echo $myJSON;
}
	
?>