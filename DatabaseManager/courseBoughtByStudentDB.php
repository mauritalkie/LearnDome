<?php
include_once(dirname(__DIR__).'/DatabaseManager/connectionDB.php');

class CourseBoughtByStudent extends Connection{
	public function insertPurchaseCourseStudent($studentId, $courseId){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_insert_purchase_course_student(?, ?)");
		$stmt->bindParam(1, $studentId, PDO::PARAM_INT);
		$stmt->bindParam(2, $courseId, PDO::PARAM_INT);
		$stmt->execute();

		$this->disconnect();
	}

	public function updateCurrentLevel($studentId, $courseId, $newLevel){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_update_current_level(?, ?, ?)");
		$stmt->bindParam(1, $studentId, PDO::PARAM_INT);
		$stmt->bindParam(2, $courseId, PDO::PARAM_INT);
		$stmt->bindParam(3, $newLevel, PDO::PARAM_INT);
		$stmt->execute();

		$this->disconnect();
	}

	public function setCompletedDate($studentId, $courseId){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_set_completed_date(?, ?)");
		$stmt->bindParam(1, $studentId, PDO::PARAM_INT);
		$stmt->bindParam(2, $courseId, PDO::PARAM_INT);
		$stmt->execute();

		$this->disconnect();
	}
}
?>