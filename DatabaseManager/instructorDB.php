<?php
include_once(dirname(__DIR__).'/DatabaseManager/connectionDB.php');

class Instructor extends Connection{
	public function insertInstructor($username, $userPassword, $firstName, $lastName, $genre, $birthdate, $email, $image){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_insert_instructor(?, ?, ?, ?, ?, ?, ?, ?)");
		$stmt->bindParam(1, $username, PDO::PARAM_STR);
		$stmt->bindParam(2, $userPassword, PDO::PARAM_STR);
		$stmt->bindParam(3, $firstName, PDO::PARAM_STR);
		$stmt->bindParam(4, $lastName, PDO::PARAM_STR);
		$stmt->bindParam(5, $genre, PDO::PARAM_STR);
		$stmt->bindParam(6, $birthdate, PDO::PARAM_STR);
		$stmt->bindParam(7, $email, PDO::PARAM_STR);
		$stmt->bindParam(8, $image, PDO::PARAM_STR);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function getInstructor($id){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_instructor(?)");
		$stmt->bindParam(1, $id, PDO::PARAM_INT);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function updateInstructor($username, $password, $firstname, $lastname, $email, $image, $id){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_update_instructor(?, ?, ?, ?, ?, ?, ?)");
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

	public function deleteInstructor($id){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_delete_instructor(?)");
		$stmt->bindParam(1, $id, PDO::PARAM_INT);
		$stmt->execute();

		$this->disconnect();
	}

	public function getInstructorUsername($username){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_instructor_username(?)");
		$stmt->bindParam(1, $username, PDO::PARAM_STR);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function getInstructorEmail($email){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_instructor_email(?)");
		$stmt->bindParam(1, $email, PDO::PARAM_STR);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function increaseCoursesNumber($id){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_increase_courses_number(?)");
		$stmt->bindParam(1, $id, PDO::PARAM_INT);
		$stmt->execute();

		$this->disconnect();
	}

	public function decreaseCoursesNumber($id){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_decrease_courses_number(?)");
		$stmt->bindParam(1, $id, PDO::PARAM_INT);
		$stmt->execute();

		$this->disconnect();
	}

	// public function updateInstructorScore() -> pendiente hasta averiguar con exactitud el sp

	public function lockInstructor($id){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_lock_instructor(?)");
		$stmt->bindParam(1, $id, PDO::PARAM_INT);
		$stmt->execute();

		$this->disconnect();
	}

	public function unlockInstructor($id){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_unlock_instructor(?)");
		$stmt->bindParam(1, $id, PDO::PARAM_INT);
		$stmt->execute();

		$this->disconnect();
	}

	public function loginInstructor($username, $userPassword){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_login_instructor(?, ?)");
		$stmt->bindParam(1, $username, PDO::PARAM_STR);
		$stmt->bindParam(2, $userPassword, PDO::PARAM_STR);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function getLockedInstructors(){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_locked_instructors()");
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}
}
?>