<?php
include_once(dirname(__DIR__).'/DatabaseManager/connectionDB.php');

class Administrator extends Connection{
	public function getAdministrator($id){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_administrator(?)");
		$stmt->bindParam(1, $id, PDO::PARAM_INT);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function updateAdministrator($username, $password, $firstname, $lastname, $email, $image, $id){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_update_administrator(?, ?, ?, ?, ?, ?, ?)");
		$stmt->bindParam(1, $username, PDO::PARAM_STR);
		$stmt->bindParam(2, $password, PDO::PARAM_STR);
		$stmt->bindParam(3, $firstname, PDO::PARAM_STR);
		$stmt->bindParam(4, $lastname, PDO::PARAM_STR);
		$stmt->bindParam(5, $email, PDO::PARAM_STR);
		$stmt->bindParam(6, $image, PDO::PARAM_STR);
		$stmt->bindParam(7, $id, PDO::PARAM_INT);
		$stmt->execute();

		$this->disconnect();
	}
}
?>