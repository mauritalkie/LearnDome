<?php
include_once(dirname(__DIR__).'/DatabaseManager/studentDB.php');
include_once(dirname(__DIR__).'/DatabaseManager/courseDB.php');
include_once(dirname(__DIR__).'/DatabaseManager/categoryDB.php');

	$category = new Category();
	$result = $category->getCategoryByName('Musica');
	$foundCategory = json_encode($result);
	echo $foundCategory;
?>