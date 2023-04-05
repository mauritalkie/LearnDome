<?php
include_once(dirname(__DIR__).'/DatabaseManager/connectionDB.php');

class Student extends Connection{
	public function insertStudent($username, $userPassword, $firstName, $lastName, $genre, $birthdate, $email, $image){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_insert_student(?, ?, ?, ?, ?, ?, ?, ?)");
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

	public function getStudent($id){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_student(?)");
		$stmt->bindParam(1, $id, PDO::PARAM_INT);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function updateStudent($username, $password, $firstname, $lastname, $email, $image, $id){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_update_student(?, ?, ?, ?, ?, ?, ?)");
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

	public function deleteStudent($id){
		$this->connect();

		$stmt = $this->dbh>prepare("CALL sp_delete_student(?)");
		$stmt->bindParam(1, $id, PDO::PARAM_INT);
		$stmt->execute();

		$this->disconnect();
	}

	public function getStudentUsername($username){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_student_username(?)");
		$stmt->bindParam(1, $id, PDO::PARAM_STR);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function getStudentEmail($email){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_student_email(?)");
		$stmt->bindParam(1, $id, PDO::PARAM_STR);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function lockStudent($id){
		$this->connect();

		$stmt = $this->dbh>prepare("CALL sp_lock_student(?)");
		$stmt->bindParam(1, $id, PDO::PARAM_INT);
		$stmt->execute();

		$this->disconnect();
	}

	public function unlockStudent($id){
		$this->connect();

		$stmt = $this->dbh>prepare("CALL sp_unlock_student(?)");
		$stmt->bindParam(1, $id, PDO::PARAM_INT);
		$stmt->execute();

		$this->disconnect();
	}

	public function loginStudent($username, $userPassword){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_login_student(?, ?)");
		$stmt->bindParam(1, $username, PDO::PARAM_STR);
		$stmt->bindParam(1, $userPassword, PDO::PARAM_STR);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function buyCourse($id){
		$this->connect();

		$stmt = $this->dbh>prepare("CALL sp_buy_course(?)");
		$stmt->bindParam(1, $id, PDO::PARAM_INT);
		$stmt->execute();

		$this->disconnect();
	}

	public function completeCourse($id){
		$this->connect();

		$stmt = $this->dbh>prepare("CALL sp_complete_course(?)");
		$stmt->bindParam(1, $id, PDO::PARAM_INT);
		$stmt->execute();

		$this->disconnect();
	}

	public function getLockedStudents(){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_locked_students()");
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}
}
?>