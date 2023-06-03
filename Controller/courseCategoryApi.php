<?php
include_once(dirname(__DIR__).'/Model/courseCategoryDB.php');

if(isset($_POST['insertCourseCategory']))
{
	$courseCategory = new CourseCategory();
	$courseCategory->insertCourseCategory($_POST['courseId'], $_POST['categoryId']);
}

if(isset($_POST['removeCategoryFromCourse']))
{
	$courseCategory = new CourseCategory();
	$courseCategory->removeCategoryFromCourse($_POST['courseId'], $_POST['categoryId']);
}

if(isset($_POST['getCategoriesFromSelectedCourse']))
{
	$courseCategory = new CourseCategory();
	$result = $courseCategory->getCategoriesFromSelectedCourse($_POST['courseId']);
	$selectedCourse = json_encode($result);
	echo $selectedCourse;
}
?>