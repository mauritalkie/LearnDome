<?php
include_once(dirname(__DIR__).'/DatabaseManager/studentDB.php');
include_once(dirname(__DIR__).'/DatabaseManager/courseDB.php');

	$student = new Student();
	$result = $student->getStudentInfo(1);

	$arrStudent = array();
	$arrStudent["results"] = array();

	foreach($result as $row){
		$obj = array(
			"first_name" => $row['first_name'],
			"last_name" => $row['last_name'],
			"image" => base64_encode($row['image']),
			"bought_courses" => $row['bought_courses'],
		);
		array_push($arrStudent["results"], $obj);
	}

	$currentStudent = json_encode($arrStudent);
	echo $currentStudent;

	echo '<br>';

	$course = new Course();
	$result = $course->getCompletedCourses(1);
	$completedCourses = json_encode($result);
	echo $completedCourses;

	/*echo 'hii';
	echo '<br>';
	echo 'haha johnatan i cant fucking taking anymore';*/
?>