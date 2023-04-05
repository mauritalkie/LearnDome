<?php
include_once(dirname(__DIR__).'/DatabaseManager/categoryDB.php');

if(isset($_POST['insertCategory']))
{
	$category = new Category();
	$category->insertCategory($_POST['categoryName'], $_POST['categoryDescription']);
}

if(isset($_POST['getCategories']))
{
	$category = new Category();
	$result = $category->getCategories();
	$categories = json_encode($result);
	echo $categories;
}

if(isset($_POST['updateCategory']))
{
	$category = new Category();
	$category->updateCategory($_POST['id'], $_POST['categoryName'], $_POST['categoryDescription']);
}

if(isset($_POST['deleteCategory']))
{
	$category = new Category();
	$category->deleteCategory($_POST['id']);
}
?>