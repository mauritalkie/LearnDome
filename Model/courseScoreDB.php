<?php
include_once(dirname(__DIR__).'/Model/connectionDB.php');

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

	public function getScore($studentId, $courseId){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_score(?, ?)");
		$stmt->bindParam(1, $studentId, PDO::PARAM_INT);
		$stmt->bindParam(2, $courseId, PDO::PARAM_INT);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}
}
?>