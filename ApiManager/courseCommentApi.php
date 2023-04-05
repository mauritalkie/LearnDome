<?php
include_once(dirname(__DIR__).'/DatabaseManager/courseCommentDB.php');

if(isset($_POST['insertComment']))
{
	$comment = new CourseComment();
	$comment->insertComment($_POST['studentId'], $_POST['courseId'], $_POST['commemtContent']);
}

if(isset($_POST['getComments']))
{
	$comment = new CourseComment();
	$result = comment->getComments($_POST['courseId']);
	$comments = json_encode($result);
	echo $comments;
}

if(isset($_POST['deleteComment']))
{
	$comment = new CourseComment();
	$comment->deleteComment($_POST['id']);
}
?>