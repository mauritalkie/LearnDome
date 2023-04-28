<?php
include_once(dirname(__DIR__).'/DatabaseManager/studentDB.php');

if(isset($_POST['insertStudent']))
{
	$student = new Student();
	$imageData = file_get_contents($_FILES['image']['tmp_name']);
	$result = $student->insertStudent($_POST['username'], $_POST['password'], $_POST['firstname'], $_POST['lastname'], $_POST['genre'], $_POST['birthdate'], $_POST['email'], $imageData);
	$currentId = json_encode($result);
	echo $currentId;
}

if(isset($_POST['getStudent']))
{
	$student = new Student();
	$result = $student->getStudent($_POST['id']);

	$arrStudent = array();
	$arrStudent["results"] = array();

	foreach($result as $row){
		$obj = array(
			"username" => $row['username'],
			"password" => $row['user_password'],
			"first_name" => $row['first_name'],
			"last_name" => $row['last_name'],
			"email" => $row['email'],
			"image" => base64_encode($row['image']),
			"bought_courses" => $row['bought_courses'],
			"completed_courses" => $row['completed_courses']
		);
		array_push($arrStudent, $obj);
	}

	$currentStudent = json_encode($arrStudent);
	echo $currentStudent;
}

if(isset($_POST['updateStudent']))
{
	$student = new Student();
	$imageData = file_get_contents($_FILES['image']['tmp_name']);
	$student->updateStudent($_POST['username'], $_POST['password'], $_POST['firstname'], $_POST['lastname'], $_POST['email'], $imageData, $_POST['id']);
}

if(isset($_POST['deleteStudent']))
{
	$student = new Student();
	$student->deleteStudent($_POST['id']);
}

if(isset($_POST['getStudentUsername']))
{
	$student = new Student();
	$result = $student->getStudentUsername($_POST['username']);
	$username = json_encode($result);
	echo $username;
}

if(isset($_POST['getStudentEmail']))
{
	$student = new Student();
	$result = $student->getStudentEmail($_POST['email']);
	$email = json_encode($result);
	echo $email;
}

if(isset($_POST['lockStudent']))
{
	$student = new Student();
	$student->lockStudent($_POST['id']);
}

if(isset($_POST['unlockStudent']))
{
	$student = new Student();
	$student->unlockStudent($_POST['id']);
}

if(isset($_POST['loginStudent']))
{
	$student = new Student();
	$result = $student->loginStudent($_POST['username'], $_POST['password']);
	$keys = json_encode($result);
	echo $keys;
}

if(isset($_POST['buyCourse']))
{
	$student = new Student();
	$student->buyCourse($_POST['id']);
}

if(isset($_POST['completeCourse']))
{
	$student = new Student();
	$student->completeCourse($_POST['id']);
}

if(isset($_POST['getLockedStudents']))
{
	$student = new Student();
	$result = $student->getLockedStudents();
	$lockedStudents = json_encode($result);
	echo $lockedStudents;
}
?>