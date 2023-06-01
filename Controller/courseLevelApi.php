<?php
include_once(dirname(__DIR__).'/Model/courseLevelDB.php');

if(isset($_POST['insertCourselevel']))
{
	$level = new CourseLevel();
	$level->insertCourselevel($_POST['courseId'], $_POST['levelNumber'], $_POST['blockTitle']);
}

if(isset($_POST['getLevels']))
{
	$level = new CourseLevel();
	$result = $level->getLevels($_POST['courseId'], $_POST['studentId']);
	$levels = json_encode($result);
	echo $levels;
}
?>