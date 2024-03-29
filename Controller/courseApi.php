<?php
include_once(dirname(__DIR__).'/Model/courseDB.php');

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
			"course_description" => $row['course_description'],
			"is_active" => $row['is_active']
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

	$arrCourses = array();
	$arrCourses["results"] = array();

	foreach($result as $row){
		$obj = array(
			"id" => $row['id'],
			"course_name" => $row['course_name'],
			"course_description" => $row['course_description'],
			"image" => base64_encode($row['image'])
		);
		array_push($arrCourses["results"], $obj);
	}

	$courses = json_encode($arrCourses);
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
		array_push($arrCourses["results"], $obj);
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
		array_push($arrCourses["results"], $obj);
	}

	$courses = json_encode($arrCourses);
	echo $courses;
}

if(isset($_POST['getBestScoredCourses']))
{
	$course = new Course();
	$results = $course->getBestScoredCourses();

	$arrCourses = array();
	$arrCourses["results"] = array();

	foreach($results as $row){
		$obj = array(
			"id" => $row['id'],
			"course_name" => $row['course_name'],
			"course_description" => $row['course_description'],
			"image" => base64_encode($row['image'])
		);
		array_push($arrCourses["results"], $obj);
	}
	$courses = json_encode($arrCourses);
	echo $courses;
}

if(isset($_POST['getTopSoldCourses']))
{
	$course = new Course();
	$results = $course->getTopSoldCourses();

	$arrCourses = array();
	$arrCourses["results"] = array();

	foreach($results as $row){
		$obj = array(
			"id" => $row['course_id'],
			"course_name" => $row['course_name'],
			"course_description" => $row['course_description'],
			"image" => base64_encode($row['image'])
		);
		array_push($arrCourses["results"], $obj);
	}
	$courses = json_encode($arrCourses);
	echo $courses;
}

if(isset($_POST['getMostRecentCourses']))
{
	$course = new Course();
	$results = $course->getMostRecentCourses();

	$arrCourses = array();
	$arrCourses["results"] = array();

	foreach($results as $row){
		$obj = array(
			"id" => $row['id'],
			"course_name" => $row['course_name'],
			"course_description" => $row['course_description'],
			"image" => base64_encode($row['image'])
		);
		array_push($arrCourses["results"], $obj);
	}
	$courses = json_encode($arrCourses);
	echo $courses;
}

if(isset($_POST['getCoursesByInstructorName']))
{
	$course = new Course();
	$results = $course->getCoursesByInstructorName($_POST['completeName']);

	$arrCourses = array();
	$arrCourses["results"] = array();

	foreach($results as $row){
		$obj = array(
			"id" => $row['id'],
			"course_name" => $row['course_name'],
			"course_description" => $row['course_description'],
			"image" => base64_encode($row['image'])
		);
		array_push($arrCourses["results"], $obj);
	}
	$courses = json_encode($arrCourses);
	echo $courses;
}

if(isset($_POST['getCoursesByDateRange']))
{
	$course = new Course();
	$results = $course->getCoursesByDateRange($_POST['firstDate'], $_POST['lastDate']);

	$arrCourses = array();
	$arrCourses["results"] = array();

	foreach($results as $row){
		$obj = array(
			"id" => $row['id'],
			"course_name" => $row['course_name'],
			"course_description" => $row['course_description'],
			"image" => base64_encode($row['image'])
		);
		array_push($arrCourses["results"], $obj);
	}
	$courses = json_encode($arrCourses);
	echo $courses;
}

if(isset($_POST['getCompletedCourses']))
{
	$course = new Course();
	$result = $course->getCompletedCourses($_POST['studentId']);
	$completedCourses = json_encode($result);
	echo $completedCourses;
}

if(isset($_POST['getCourseStatus']))
{
	$course = new Course();
	$result = $course->getCourseStatus($_POST['studentId'], $_POST['courseId']);
	$courseStatus = json_encode($result);
	echo $courseStatus;
}

if(isset($_POST['getCourseCertificate']))
{
	$course = new Course();
	$result = $course->getCourseCertificate($_POST['studentId'], $_POST['courseId']);
	$courseCertificate = json_encode($result);
	echo $courseCertificate;
}

if(isset($_POST['getAllCourses']))
{
	$course = new Course();
	$results = $course->getAllCourses();

	$arrCourses = array();
	$arrCourses["results"] = array();

	foreach($results as $row){
		$obj = array(
			"id" => $row['id'],
			"course_name" => $row['course_name'],
			"course_description" => $row['course_description'],
			"image" => base64_encode($row['image'])
		);
		array_push($arrCourses["results"], $obj);
	}
	$courses = json_encode($arrCourses);
	echo $courses;
}
?>