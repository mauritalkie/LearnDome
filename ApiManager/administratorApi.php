<?php
include_once(dirname(__DIR__).'/DatabaseManager/administratorDB.php');

if(isset($_POST['insertAdministrator']))
{
	$admin = new Administrator();
	$imageData = file_get_contents($_FILES['image']['tmp_name']);
	$result = $admin->insertAdministrator($_POST['username'], $_POST['password'], $_POST['firstname'], $_POST['lastname'], $_POST['genre'], $_POST['birthdate'], $_POST['email'], $imageData);
	$currentId = json_encode($result);
	echo $currentId;
}

if(isset($_POST['getAdministrator']))
{
	$admin = new Administrator();
	$result = $admin->getAdministrator($_POST['id']);

	$arrAdmin = array();
	$arrAdmin["results"] = array();

	foreach($result as $row){
		$obj = array(
			"username" => $row['username'],
			"password" => $row['user_password'],
			"first_name" => $row['first_name'],
			"last_name" => $row['last_name'],
			"email" => $row['email'],
			"image" => base64_encode($row['image'])
		);
		array_push($arrAdmin["results"], $obj);
	}

	$currentAdmin = json_encode($arrAdmin);
	echo $currentAdmin;
}

if(isset($_POST['updateAdministrator']))
{
	$admin = new Administrator();
	$imageData = file_get_contents($_FILES['image']['tmp_name']);
	$admin->updateAdministrator($_POST['username'], $_POST['password'], $_POST['firstname'], $_POST['lastname'], $_POST['email'], $imageData, $_POST['id']);
}

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