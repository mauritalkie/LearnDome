<?php
include_once(dirname(__DIR__).'/DatabaseManager/courseLevelDB.php');

if(isset($_POST['insertCourselevel']))
{
	$level = new CourseLevel();
	$level->insertCourselevel($_POST['courseId'], $_POST['levelNumber'], $_POST['blockTitle']);
}

if(isset($_POST['getLevels']))
{
	$level = new CourseLevel();
	$result = $level->getLevels($_POST['courseId']);
	$levels = json_encode($result);
	echo $levels;
}

if(isset($_POST['getExistingLevel']))
{
	$level = new CourseLevel();
	$result = $level->getExistingLevel($_POST['courseId'], $_POST['levelNumber'], $_POST['blockTitle']);
	$levels = json_encode($result);
	echo $levels;
}
?>