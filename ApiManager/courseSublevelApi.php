<?php
include_once(dirname(__DIR__).'/DatabaseManager/courseSublevelDB.php');

if(isset($_POST['insertCourseSublevel']))
{
	$sublevel = new CourseSublevel();
	$sublevel->insertCourseSublevel($_POST['courseId'], $_POST['levelNumber'], $_POST['sublevelNumber'], $_POST['topicTitle'], $_POST['mediaFile']);
}

if(isset($_POST['getSublevels']))
{
	$sublevel = new CourseSublevel();
	$result = $sublevel->getSublevels($_POST['courseId'], $_POST['levelNumber']);
	$sublevels = json_encode($result);
	echo $sublevels;
}

if(isset($_POST['getExistingSublevel']))
{
	$sublevel = new CourseSublevel();
	$result = $sublevel->getExistingSublevel($_POST['courseId'], $_POST['levelNumber'], $_POST['sublevelNumber'], $_POST['topicTitle']);
	$sublevels = json_encode($result);
	echo $sublevels;
}

if(isset($_POST['setSeenSublevel']))
{
	$sublevel = new sublevel();
	$sublevel->setSeenSublevel($_POST['id']);
}
?>