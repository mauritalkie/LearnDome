<?php
include_once(dirname(__DIR__).'/Model/studentDB.php');
include_once(dirname(__DIR__).'/Model/courseDB.php');
include_once(dirname(__DIR__).'/Model/categoryDB.php');

	$category = new Category();
	$result = $category->getCategoryByName('Musica');
	$foundCategory = json_encode($result);
	echo $foundCategory;
?>