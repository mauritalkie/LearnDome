<?php
include_once(dirname(__DIR__).'/Model/courseSublevelDB.php');

if(isset($_POST['insertCourseSublevel']))
{
	$sublevel = new CourseSublevel();
	$imagedata = file_get_contents($_FILES['mediaFile']['tmp_name']);
	$sublevel->insertCourseSublevel($_POST['courseId'], $_POST['levelNumber'], $_POST['sublevelNumber'], $_POST['topicTitle'], $imagedata);
}

if(isset($_POST['getSublevels']))
{
	$sublevel = new CourseSublevel();
	$result = $sublevel->getSublevels($_POST['courseId'], $_POST['levelNumber'], $_POST['studentId']);

	$arrSublevels = array();
	$arrSublevels["results"] = array();

	foreach($result as $row){
		$obj = array(
			"id" => $row["id"],
			"sublevel_number" => $row["sublevel_number"],
			"topic_title" => $row["topic_title"],
			"media_file" => base64_encode($row["media_file"])
		);
		array_push($arrSublevels["results"], $obj);
	}

	$sublevels = json_encode($arrSublevels);
	echo $sublevels;
}
?>