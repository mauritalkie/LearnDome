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

if(isset($_POST['getCategoryByName']))
{
	$category = new Category();
	$result = $category->getCategoryByName($_POST['categoryName']);
	$foundCategory = json_encode($result);
	echo $foundCategory;
}
?>