<?php
include_once(dirname(__DIR__).'/Model/connectionDB.php');

class CourseLevel extends Connection{
	public function insertCourselevel($courseId, $levelNumber, $blockTitle){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_insert_course_level(?, ?, ?)");
		$stmt->bindParam(1, $courseId, PDO::PARAM_INT);
		$stmt->bindParam(2, $levelNumber, PDO::PARAM_INT);
		$stmt->bindParam(3, $blockTitle, PDO::PARAM_STR);
		$stmt->execute();

		$this->disconnect();
	}

	public function getLevels($courseId, $studentId){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_levels(?, ?)");
		$stmt->bindParam(1, $courseId, PDO::PARAM_INT);
		$stmt->bindParam(2, $studentId, PDO::PARAM_INT);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}
}
?>