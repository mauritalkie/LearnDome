<?php
include_once(dirname(__DIR__).'/DatabaseManager/connectionDB.php');

if(isset($_POST['connectionTest']))
{
	$connection = new Connection();
	$result = $connection->connect();
	echo $result;
	$connection->disconnect();
}
else
{
	echo 'something went wrong at the api';
}
?>