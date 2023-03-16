<?php
include_once(dirname(__DIR__).'/DatabaseManager/administratorDB.php');

if(isset($_POST['getAdministrator']))
{
	$admin = new Administrator();
	$result = $admin->getAdministrator($_POST['id']);
	$currentAdmin = json_encode($result);
	echo $currentAdmin;
}

if(isset($_POST['updateAdministrator']))
{
	$admin = new Administrator();
	$result = $admin->updateAdministrator($_POST['username'], $_POST['password'], $_POST['firstname'], $_POST['lastname'], $_POST['email'], $_POST['image'], $_POST['id']);
}
?>