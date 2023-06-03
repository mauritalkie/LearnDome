<?php
include_once(dirname(__DIR__).'/Model/connectionDB.php');

class CourseComment extends Connection{
	public function insertComment($studentId, $courseId, $commentContent){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_insert_comment(?, ?, ?)");
		$stmt->bindParam(1, $studentId, PDO::PARAM_INT);
		$stmt->bindParam(2, $courseId, PDO::PARAM_INT);
		$stmt->bindParam(3, $commentContent, PDO::PARAM_STR);
		$stmt->execute();

		$this->disconnect();
	}

	public function getComments($courseId){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_comments(?)");
		$stmt->bindParam(1, $courseId, PDO::PARAM_INT);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function deleteComment($id){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_delete_comment(?)");
		$stmt->bindParam(1, $id, PDO::PARAM_INT);
		$stmt->execute();

		$this->disconnect();
	}
}
?>