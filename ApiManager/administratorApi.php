<?php
include_once(dirname(__DIR__).'/DatabaseManager/administratorDB.php');

if(isset($_POST['insertAdministrator']))
{
	$admin = new Administrator();
	$admin->insertAdministrator($_POST['username'], $_POST['password'], $_POST['firstname'], $_POST['lastname'], $_POST['genre'], $_POST['birthdate'], $_POST['email'], $_POST['image']);
}

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
	$admin->updateAdministrator($_POST['username'], $_POST['password'], $_POST['firstname'], $_POST['lastname'], $_POST['email'], $_POST['image'], $_POST['id']);
}

if(isset($_POST['deleteAdministrator']))
{
	$admin = new Administrator();
	$admin->deleteAdministrator($_POST['id']);
}

$admin = new Administrator();
	$admin->deleteAdministrator(2);

if(isset($_POST['getAdministratorUsername']))
{
	$admin = new Administrator();
	$result = $admin->getAdministratorUsername($_POST['username']);
	$username = json_encode($result);
	echo $username;
}

if(isset($_POST['getAdministratorEmail']))
{
	$admin = new Administrator();
	$result = $admin->getAdministratorEmail($_POST['email']);
	$email = json_encode($result);
	echo $email;
}

if(isset($_POST['loginAdministrator']))
{
	$admin = new Administrator();
	$result = $admin->loginAdministrator($_POST['username'], $_POST['password']);
	$keys = json_encode($result);
	echo $keys;
}
?>