<?php
include_once(dirname(__DIR__).'/DatabaseManager/instructorDB.php');

if(isset($_POST['insertInstructor']))
{
	$instructor = new Instructor();
	$instructor->insertInstructor($_POST['username'], $_POST['password'], $_POST['firstname'], $_POST['lastname'], $_POST['genre'], $_POST['birthdate'], $_POST['email'], $_POST['image']);
}

if(isset($_POST['getInstructor']))
{
	$instructor = new Instructor();
	$result = $instructor->getInstructor($_POST['id']);
	$currentInstructor = json_encode($result);
	echo $currentInstructor;
}

if(isset($_POST['updateInstructor']))
{
	$instructor = new Instructor();
	$instructor->updateInstructor($_POST['username'], $_POST['password'], $_POST['firstname'], $_POST['lastname'], $_POST['email'], $_POST['image'], $_POST['id']);
}

if(isset($_POST['deleteInstructor']))
{
	$instructor = new Instructor();
	$instructor->deleteInstructor($_POST['id']);
}

if(isset($_POST['getInstructorUsername']))
{
	$instructor = new Instructor();
	$result = $instructor->getInstructorUsername($_POST['username']);
	$username = json_encode($result);
	echo $username;
}

if(isset($_POST['getInstructorEmail']))
{
	$instructor = new Instructor();
	$result = $instructor->getInstructorEmail($_POST['email']);
	$email = json_encode($result);
	echo $email;
}

if(isset($_POST['increaseCoursesNumber']))
{
	$instructor = new Instructor();
	$instructor->increaseCoursesNumber($_POST['id']);
}

if(isset($_POST['decreaseCoursesNumber']))
{
	$instructor = new Instructor();
	$instructor->decreaseCoursesNumber($_POST['id']);
}

// if(isset($_POST['updateInstructorScore'])){} -> pendiente hasta averiguar con exactitud el sp

if(isset($_POST['lockInstructor']))
{
	$instructor = new Instructor();
	$instructor->lockInstructor($_POST['id']);
}

if(isset($_POST['unlockInstructor']))
{
	$instructor = new Instructor();
	$instructor->unlockInstructor($_POST['id']);
}

if(isset($_POST['loginInstructor']))
{
	$instructor = new Instructor();
	$result = $instructor->loginInstructor($_POST['username'], $_POST['password']);
	$keys = json_encode($result);
	echo $keys;
}

if(isset($_POST['getLockedInstructors']))
{
	$instructor = new Instructor();
	$result = $instructor->getLockedInstructors();
	$lockedInstructors = json_encode($result);
	echo $lockedInstructors;
}
?>