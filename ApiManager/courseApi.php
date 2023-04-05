<?php
include_once(dirname(__DIR__).'/DatabaseManager/courseDB.php');

if(isset($_POST['insertCourse']))
{
	$course = new Course();
	$course->insertCourse($_POST['courseName'], $_POST['instructorId'], $_POST['price'], $_POST['image'], $_POST['courseDescription']);
}

if(isset($_POST['getCourse']))
{
	$course = new Course();
	$result = $course->getCourse($_POST['id']);
	$selectedCourse = json_encode($result);
	echo $selectedCourse;
}

if(isset($_POST['updateCourse']))
{
	$course = new Course();
	$course->updateCourse($_POST['id'], $_POST['courseName'], $_POST['price'], $_POST['image'], $_POST['courseDescription']);
}

if(isset($_POST['deleteCourse']))
{
	$course = new Course();
	$course->deleteCourse($_POST['id']);
}

if(isset($_POST['getCoursesByInstructor']))
{
	$course = new Course();
	$result = $course->getCoursesByInstructor($_POST['instructorId']);
	$courses = json_encode($result);
	echo $courses;
}
?>