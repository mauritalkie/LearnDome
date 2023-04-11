<?php
include_once(dirname(__DIR__).'/DatabaseManager/connectionDB.php');

class CourseCategory extends Connection{
	public function insertCourseCategory($courseId, $categoryId){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_insert_course_category(?, ?)");
		$stmt->bindParam(1, $courseId, PDO::PARAM_INT);
		$stmt->bindParam(2, $categoryId, PDO::PARAM_INT);
		$stmt->execute();

		$this->disconnect();
	}

	public function removeCategoryFromCourse($courseId, $categoryId){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_remove_category_from_course(?, ?)");
		$stmt->bindParam(1, $courseId, PDO::PARAM_INT);
		$stmt->bindParam(2, $categoryId, PDO::PARAM_INT);
		$stmt->execute();

		$this->disconnect();
	}

	public function getCategoriesFromSelectedCourse($courseId){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_categories_from_selected_course(?)");
		$stmt->bindParam(1, $courseId, PDO::PARAM_INT);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}
}
?>