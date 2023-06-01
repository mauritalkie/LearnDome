<?php
include_once(dirname(__DIR__).'/Model/connectionDB.php');

class SeenSublevel extends Connection{
	public function insertSeenSublevel($studentId, $courseId, $sublevelId){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_insert_seen_sublevel(?, ?, ?)");
		$stmt->bindParam(1, $studentId, PDO::PARAM_INT);
		$stmt->bindParam(2, $courseId, PDO::PARAM_INT);
		$stmt->bindParam(3, $sublevelId, PDO::PARAM_INT);
		$stmt->execute();

		$this->disconnect();
	}
}
?>