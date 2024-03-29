<?php
include_once(dirname(__DIR__).'/Model/connectionDB.php');

class Category extends Connection{
	public function insertCategory($categoryName, $categoryDescription){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_insert_category(?, ?)");
		$stmt->bindParam(1, $categoryName, PDO::PARAM_STR);
		$stmt->bindParam(2, $categoryDescription, PDO::PARAM_STR);
		$stmt->execute();

		$this->disconnect();
	}

	public function getCategories(){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_categories()");
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function getCategoryByName($categoryName){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_get_category_by_name(?)");
		$stmt->bindParam(1, $categoryName, PDO::PARAM_STR);
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		$this->disconnect();
		return $result;
	}

	public function updateCategory($categoryName, $categoryDescription, $id){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_update_category(?, ?, ?)");
		$stmt->bindParam(1, $categoryName, PDO::PARAM_STR);
		$stmt->bindParam(2, $categoryDescription, PDO::PARAM_STR);
		$stmt->bindParam(3, $id, PDO::PARAM_INT);
		$stmt->execute();

		$this->disconnect();
	}

	public function deleteCategory($id){
		$this->connect();

		$stmt = $this->dbh->prepare("CALL sp_delete_category(?)");
		$stmt->bindParam(1, $id, PDO::PARAM_INT);
		$stmt->execute();

		$this->disconnect();
	}
}
?>