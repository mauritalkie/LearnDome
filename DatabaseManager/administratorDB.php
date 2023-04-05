<?php
include_once(dirname(__DIR__).'/DatabaseManager/connectionDB.php');

class Administrator extends Connection{
	public function insertAdministrator($username, $userPassword, $firstName, $lastName, $genre, $birthdate, $email, $image){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_insert_administrator(?, ?, ?, ?, ?, ?, ?, ?)");
		$stmt->bindParam(1, $username, PDO::PARAM_STR);
		$stmt->bindParam(2, $userPassword, PDO::PARAM_STR);
		$stmt->bindParam(3, $firstName, PDO::PARAM_STR);
		$stmt->bindParam(4, $lastName, PDO::PARAM_STR);
		$stmt->bindParam(5, $genre, PDO::PARAM_STR);
		$stmt->bindParam(6, $birthdate, PDO::PARAM_STR);
		$stmt->bindParam(7, $email, PDO::PARAM_STR);
		$stmt->bindParam(8, $image, PDO::PARAM_STR);
		$stmt->execute();

		$this->disconnect();
	}

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

	public function deleteAdministrator($id){
		$this->connect();

		$stmt = $this->dbh>prepare("CALL sp_delete_administrator(?)");
		$stmt->bindParam(1, $id, PDO::PARAM_INT);
		$stmt->execute();

		$this->disconnect();
	}

	public function getAdministratorUsername($username){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_administrator_username(?)");
		$stmt->bindParam(1, $id, PDO::PARAM_STR);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function getAdministratorEmail($email){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_administrator_email(?)");
		$stmt->bindParam(1, $id, PDO::PARAM_STR);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function loginAdministrator($username, $userPassword){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_login_administrator(?, ?)");
		$stmt->bindParam(1, $username, PDO::PARAM_STR);
		$stmt->bindParam(1, $userPassword, PDO::PARAM_STR);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}
}
?>