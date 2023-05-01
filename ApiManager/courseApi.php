<?php
include_once(dirname(__DIR__).'/DatabaseManager/courseDB.php');

if(isset($_POST['insertCourse']))
{
	$course = new Course();
	$imageData = file_get_contents($_FILES['image']['tmp_name']);
	$result = $course->insertCourse($_POST['courseName'], $_POST['instructorId'], $_POST['price'], $imageData, $_POST['courseDescription']);
	$currentId = json_encode($result);
	echo $currentId;
}

if(isset($_POST['getCourse']))
{
	$course = new Course();
	$result = $course->getCourse($_POST['id']);

	$arrCourse = array();
	$arrCourse["results"] = array();

	foreach($result as $row){
		$obj = array(
			"course_name" => $row['course_name'],
			"first_name" => $row['first_name'],
			"last_name" => $row['last_name'],
			"score" => $row['score'],
			"created_at" => $row['created_at'],
			"price" => $row['price'],
			"image" => base64_encode($row['image']),
			"course_description" => $row['course_description']
		);
		array_push($arrCourse["results"], $obj);
	}

	$selectedCourse = json_encode($arrCourse);
	echo $selectedCourse;
}

if(isset($_POST['updateCourse']))
{
	$course = new Course();
	$imageData = file_get_contents($_FILES['image']['tmp_name']);
	$course->updateCourse($_POST['id'], $_POST['courseName'], $_POST['price'], $imageData, $_POST['courseDescription']);
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

if(isset($_POST['getCoursesByCategory']))
{
	$course = new Course();
	$result = $course->getCoursesByCategory($_POST['id']);

	$arrCourses = array();
	$arrCourses["results"] = array();

	foreach($result as $row){
		$obj = array(
			"id" => $row['id'],
			"course_name" => $row['course_name'],
			"course_description" => $row['course_description'],
			"image" => base64_encode($row['image'])
		);
		array_push($arrCourses, $obj);
	}

	$courses = json_encode($arrCourses);
	echo $courses;
}

if(isset($_POST['getCoursesBySearch']))
{
	$course = new Course();
	$result = $course->getCoursesBySearch($_POST['courseSearch']);
	
	$arrCourses = array();
	$arrCourses["results"] = array();

	foreach($result as $row){
		$obj = array(
			"id" => $row['id'],
			"course_name" => $row['course_name'],
			"course_description" => $row['course_description'],
			"image" => base64_encode($row['image'])
		);
		array_push($arrCourses, $obj);
	}

	$courses = json_encode($arrCourses);
	echo $courses;
}

if(isset($_POST['getBestScoredCourses']))
{
	$course = new Course();
	$result = $course->getBestScoredCourses();

	$arrCourses = array();
	$arrCourses["results"] = array();

	foreach($results as $row){
		$obj = array(
			"id" => $row['id'],
			"course_name" => $row['course_name'],
			"course_description" => $row['course_description'],
			"image" => base64_encode($row['image'])
		);
		array_push($arrCourses, $obj);
	}
	$courses = json_encode($arrCourses);
	echo $courses;
}

if(isset($_POST['getTopSoldCourses']))
{
	$course = new Course();
	$result = $course->getTopSoldCourses();

	$arrCourses = array();
	$arrCourses["results"] = array();

	foreach($results as $row){
		$obj = array(
			"id" => $row['id'],
			"course_name" => $row['course_name'],
			"course_description" => $row['course_description'],
			"image" => base64_encode($row['image'])
		);
		array_push($arrCourses, $obj);
	}
	$courses = json_encode($arrCourses);
	echo $courses;
}

if(isset($_POST['getMostRecentCourses']))
{
	$course = new Course();
	$result = $course->getMostRecentCourses();

	$arrCourses = array();
	$arrCourses["results"] = array();

	foreach($results as $row){
		$obj = array(
			"id" => $row['id'],
			"course_name" => $row['course_name'],
			"course_description" => $row['course_description'],
			"image" => base64_encode($row['image'])
		);
		array_push($arrCourses, $obj);
	}
	$courses = json_encode($arrCourses);
	echo $courses;
}
?>