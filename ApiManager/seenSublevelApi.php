<?php
include_once(dirname(__DIR__).'/DatabaseManager/seenSublevelDB.php');

if(isset($_POST['insertSeenSublevel']))
{
	$seenSublevel = new SeenSublevel();
	$seenSublevel->insertSeenSublevel($_POST['studentId'], $_POST['courseId'], $_POST['sublevelId']);
}
?>