<?php
include_once(dirname(__DIR__).'/DatabaseManager/messageDB.php');

if(isset($_POST['insertMessage']))
{
	$message = new Message();
	$message->insertMessage($_POST['firstUserId'], $_POST['secondUserId'], $_POST['messageContent']);
}

if(isset($_POST['getMesseges']))
{
	$message = new Message();
	$result = message->getMesages($_POST['firstUserId'], $_POST['secondUserId']);
	$messages = json_encode($result);
	echo $messages;
}
?>