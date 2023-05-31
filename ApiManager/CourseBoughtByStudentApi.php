<?php
include_once(dirname(__DIR__).'/DatabaseManager/CourseBoughtByStudentDB.php');

if(isset($_POST['insertPurchaseCourseStudent']))
{
	$purchase = new CourseBoughtByStudent();
	$purchase->insertPurchaseCourseStudent($_POST['studentId'], $_POST['courseId']);
}

if(isset($_POST['setCompletedDate']))
{
	$date = new CourseBoughtByStudent();
	$date->setCompletedDate($_POST['studentId'], $_POST['courseId']);
}

if(isset($_POST['getPurchaseStatus']))
{
	$purchase = new CourseBoughtByStudent();
	$result = $purchase->getPurchaseStatus($_POST['studentId'], $_POST['courseId']);
	$isPurchased = json_encode($result);
	echo $isPurchased;
}
?>