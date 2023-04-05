<?php
include_once(dirname(__DIR__).'/DatabaseManager/studentDB.php');

if(isset($_POST['insertStudent']))
{
	$student = new Student();
	$student->insertStudent($_POST['username'], $_POST['password'], $_POST['firstname'], $_POST['lastname'], $_POST['genre'], $_POST['birthdate'], $_POST['email'], $_POST['image']);
}

if(isset($_POST['getStudent']))
{
	$student = new Student();
	$result = $student->getStudent($_POST['id']);
	$currentStudent = json_encode($result);
	echo $currentStudent;
}

if(isset($_POST['updateStudent']))
{
	$student = new Student();
	$student->updateStudent($_POST['username'], $_POST['password'], $_POST['firstname'], $_POST['lastname'], $_POST['email'], $_POST['image'], $_POST['id']);
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