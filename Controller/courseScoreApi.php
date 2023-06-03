<?php
include_once(dirname(__DIR__).'/Model/courseScoreDB.php');

if(isset($_POST['insertScore']))
{
	$score = new CourseScore();
	$score->insertScore($_POST['studentId'], $_POST['courseId'], $_POST['liked']);
}

if(isset($_POST['getScore']))
{
	$score = new CourseScore();
	$result = $score->getScore($_POST['studentId'], $_POST['courseId']);
	$currentScore = json_encode($result);
	echo $currentScore;
}
?>