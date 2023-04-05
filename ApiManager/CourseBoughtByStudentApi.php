<?php
include_once(dirname(__DIR__).'/DatabaseManager/CourseBoughtByStudentDB.php');

if(isset($_POST['insertPurchaseCourseStudent']))
{
	$purchase = new CourseBoughtByStudent();
	$purchase->insertPurchaseCourseStudent($_POST['studentId'], $_POST['courseId']);
}

if(isset($_POST['updateCurrentLevel']))
{
	$update = new CourseBoughtByStudent();
	$update->updateCurrentLevel($_POST['studentId'], $_POST['courseId'], $_POST['newLevel']);
}

if(isset($_POST['setCompletedDate']))
{
	$date = new CourseBoughtByStudent();
	$date->setCompletedDate($_POST['studentId'], $_POST['courseId']);
}
?>