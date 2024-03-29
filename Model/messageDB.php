<?php
include_once(dirname(__DIR__).'/Model/connectionDB.php');

class Message extends Connection{
	public function insertMessage($firstUserId, $secondUserId, $messageContent, $userWhoSentId){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_insert_message(?, ?, ?, ?)");
		$stmt->bindParam(1, $firstUserId, PDO::PARAM_STR);
		$stmt->bindParam(2, $secondUserId, PDO::PARAM_STR);
		$stmt->bindParam(3, $userWhoSentId, PDO::PARAM_STR);
		$stmt->bindParam(4, $messageContent, PDO::PARAM_STR);
		$stmt->execute();

		$this->disconnect();
	}

	public function getMessages($firstUserId, $secondUserId, $userWhoSentId){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_messages(?, ?, ?)");
		$stmt->bindParam(1, $firstUserId, PDO::PARAM_STR);
		$stmt->bindParam(2, $secondUserId, PDO::PARAM_STR);
		$stmt->bindParam(3, $userWhoSentId, PDO::PARAM_STR);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function getUserByUsername($username){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_user_by_username(?)");
		$stmt->bindParam(1, $username, PDO::PARAM_STR);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}
}
?>