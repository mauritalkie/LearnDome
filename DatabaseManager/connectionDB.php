<?php
class Connection{
	public $dbname = 'learn_dome';
	public $user = 'root';
	public $password ='root'; // aqui hay que cambiar el user y password dependiendo del server

	public function connect(){
		try{
			$dsn = "mysql:host=localhost;dbname=$this->dbname";
			$dbh = new PDO($dsn, $this->user, $this->password);

			$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			return 'Connection successfully';
		}
		catch(PDOException $e){
			return $e->getMessage();
		}
		finally{ // puede que esto se quite o se cambie de lugar después idk
			$dbh = null; // cierra la conexión
		}
	}
}
?>