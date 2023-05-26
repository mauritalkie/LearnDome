<?php
include_once(dirname(__DIR__).'/DatabaseManager/instructorDB.php');

if(isset($_POST['insertInstructor']))
{
	$instructor = new Instructor();
	$imageData = file_get_contents($_FILES['image']['tmp_name']);
	$result = $instructor->insertInstructor($_POST['username'], $_POST['password'], $_POST['firstname'], $_POST['lastname'], $_POST['genre'], $_POST['birthdate'], $_POST['email'], $imageData);
	$currentId = json_encode($result);
	echo $currentId;
}

if(isset($_POST['getInstructor']))
{
	$instructor = new Instructor();
	$result = $instructor->getInstructor($_POST['id']);

	$arrInstructor = array();
	$arrInstructor["results"] = array();

	foreach($result as $row){
		$obj = array(
			"username" => $row['username'],
			"password" => $row['user_password'],
			"first_name" => $row['first_name'],
			"last_name" => $row['last_name'],
			"email" => $row['email'],
			"image" => base64_encode($row['image']),
			"courses_number" => $row['courses_number'],
			"score" => $row['score']
		);
		array_push($arrInstructor["results"], $obj);
	}

	$currentInstructor = json_encode($arrInstructor);
	echo $currentInstructor;
}

if(isset($_POST['updateInstructor']))
{
	$instructor = new Instructor();
	$imageData = file_get_contents($_FILES['image']['tmp_name']);
	$instructor->updateInstructor($_POST['username'], $_POST['password'], $_POST['firstname'], $_POST['lastname'], $_POST['email'], $imageData, $_POST['id']);
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

if(isset($_POST['getCourseReport']))
{
	$instructor = new Instructor();
	$result = $instructor->getCourseReport($_POST['courseId']);
	$courseReport = json_encode($result);
	echo $courseReport;
}

if(isset($_POST['getSalesReport']))
{
	$instructor = new Instructor();
	$result = $instructor->getSalesReport($_POST['instructorId']);
	$salesReport = json_encode($result);
	echo $salesReport;
}
?>