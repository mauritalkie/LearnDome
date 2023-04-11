<?php
include_once(dirname(__DIR__).'/DatabaseManager/connectionDB.php');

class Message extends Connection{
	public function insertMessage($firstUserId, $secondUserId, $messageContent){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_insert_message(?, ?, ?)");
		$stmt->bindParam(1, $firstUserId, PDO::PARAM_INT);
		$stmt->bindParam(2, $secondUserId, PDO::PARAM_INT);
		$stmt->bindParam(3, $messageContent, PDO::PARAM_STR);
		$stmt->execute();

		$this->disconnect();
	}

	public function getMessages($firstUserId, $secondUserId, $userWhoSentId){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_messages(?, ?, ?)");
		$stmt->bindParam(1, $firstUserId, PDO::PARAM_INT);
		$stmt->bindParam(2, $secondUserId, PDO::PARAM_INT);
		$stmt->bindParam(3, $userWhoSentId, PDO::PARAM_INT);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}
}
?>