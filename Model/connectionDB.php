<?php
class Connection{
	protected $dbname = 'learn_dome';
	protected $user = 'root';
	protected $password ='root'; // aqui hay que cambiar el user y password dependiendo del server

	protected $dbh;

	public function connect(){
		try{
			$dsn = "mysql:host=localhost;dbname=$this->dbname";
			$this->dbh = new PDO($dsn, $this->user, $this->password);

			$this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			return 'connection successfully';
		}
		catch(PDOException $e){
			return $e->getMessage();
		}
	}

	public function disconnect(){
		$this->dbh = null; // cierra la conexión
	}
}
?>