<?php
include_once(dirname(__DIR__).'/Model/connectionDB.php');

class Course extends Connection{
	public function insertCourse($courseName, $instructorId, $price, $image, $courseDescription){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_insert_course(?, ?, ?, ?, ?)");
		$stmt->bindParam(1, $courseName, PDO::PARAM_STR);
		$stmt->bindParam(2, $instructorId, PDO::PARAM_INT);
		$stmt->bindParam(3, $price, PDO::PARAM_STR);
		$stmt->bindParam(4, $image, PDO::PARAM_STR);
		$stmt->bindParam(5, $courseDescription, PDO::PARAM_STR);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function getCourse($id){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_course(?)");
		$stmt->bindParam(1, $id, PDO::PARAM_INT);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function updateCourse($id, $courseName, $price, $image, $courseDescription){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_update_course(?, ?, ?, ?, ?)");
		$stmt->bindParam(1, $id, PDO::PARAM_INT);
		$stmt->bindParam(2, $courseName, PDO::PARAM_STR);
		$stmt->bindParam(3, $price, PDO::PARAM_STR);
		$stmt->bindParam(4, $image, PDO::PARAM_STR);
		$stmt->bindParam(5, $courseDescription, PDO::PARAM_STR);
		$stmt->execute();

		$this->disconnect();
	}

	public function deleteCourse($id){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_delete_course(?)");
		$stmt->bindParam(1, $id, PDO::PARAM_INT);
		$stmt->execute();

		$this->disconnect();
	}

	public function getCoursesByInstructor($instructorId){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_courses_by_instructor(?)");
		$stmt->bindParam(1, $instructorId, PDO::PARAM_INT);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function getCoursesByCategory($categoryId){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_courses_by_category(?)");
		$stmt->bindParam(1, $categoryId, PDO::PARAM_INT);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function getCoursesBySearch($courseSearch){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_courses_by_search(?)");
		$stmt->bindParam(1, $courseSearch, PDO::PARAM_STR);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function getBestScoredCourses(){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_best_scored_courses()");
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function getTopSoldCourses(){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_top_sold_courses()");
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function getMostRecentCourses(){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_most_recent_courses()");
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function getCoursesByInstructorName($completeName){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_courses_by_instructor_name(?)");
		$stmt->bindParam(1, $completeName, PDO::PARAM_STR);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function getCoursesByDateRange($firstDate, $lastDate){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_courses_by_date_range(?, ?)");
		$stmt->bindParam(1, $firstDate, PDO::PARAM_STR);
		$stmt->bindParam(2, $lastDate, PDO::PARAM_STR);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function getCompletedCourses($studentId){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_completed_courses(?)");
		$stmt->bindParam(1, $studentId, PDO::PARAM_INT);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function getCourseStatus($studentId, $courseId){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_course_status(?, ?)");
		$stmt->bindParam(1, $studentId, PDO::PARAM_INT);
		$stmt->bindParam(2, $courseId, PDO::PARAM_INT);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function getCourseCertificate($studentId, $courseId){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_course_certificate(?, ?)");
		$stmt->bindParam(1, $studentId, PDO::PARAM_INT);
		$stmt->bindParam(2, $courseId, PDO::PARAM_INT);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function getAllCourses(){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_all_courses()");
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}
}
?>