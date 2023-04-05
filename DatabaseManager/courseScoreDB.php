<?php
include_once(dirname(__DIR__).'/DatabaseManager/connectionDB.php');

class CourseScore extends Connection{
	public function insertScore($studentId, $courseId, $liked){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_insert_score(?, ?, ?)");
		$stmt->bindParam(1, $studentId, PDO::PARAM_INT);
		$stmt->bindParam(2, $courseId, PDO::PARAM_INT);
		$stmt->bindParam(3, $liked, PDO::PARAM_BOOL);
		$stmt->execute();

		$this->disconnect();
	}
}
?>