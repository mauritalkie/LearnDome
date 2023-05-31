<?php
include_once(dirname(__DIR__).'/DatabaseManager/connectionDB.php');

class CourseSublevel extends Connection{
	public function insertCourseSublevel($courseId, $levelNumber, $sublevelNumber, $topicTitle, $mediaFile){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_insert_course_sublevel(?, ?, ?, ?, ?)");
		$stmt->bindParam(1, $courseId, PDO::PARAM_INT);
		$stmt->bindParam(2, $levelNumber, PDO::PARAM_INT);
		$stmt->bindParam(3, $sublevelNumber, PDO::PARAM_INT);
		$stmt->bindParam(4, $topicTitle, PDO::PARAM_STR);
		$stmt->bindParam(5, $mediaFile, PDO::PARAM_STR);
		$stmt->execute();

		$this->disconnect();
	}

	public function getSublevels($courseId, $levelNumber, $studentId){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_sublevels(?, ?, ?)");
		$stmt->bindParam(1, $courseId, PDO::PARAM_INT);
		$stmt->bindParam(2, $levelNumber, PDO::PARAM_INT);
		$stmt->bindParam(3, $studentId, PDO::PARAM_INT);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}
}
?>