<?php
include_once(dirname(__DIR__).'/DatabaseManager/connectionDB.php');

if(isset($_POST['connectionTest']))
{
	$connection = new Connection();
	$result = $connection->connect();
	echo $result;
}
else
{
	echo 'something went wrong at the api';
}
?>