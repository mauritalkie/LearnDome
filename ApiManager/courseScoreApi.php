<?php
include_once(dirname(__DIR__).'/DatabaseManager/courseScoreDB.php');

if(isset($_POST['insertScore']))
{
	$score = new CourseScore();
	$score->insertScore($_POST['studentId'], $_POST['courseId'], $_POST['liked']);
}
?>