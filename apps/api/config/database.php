<?php

class Database {

    private $db_lib = "mysql";
    private $host = "localhost";
    private $db_name = "inkrest";
    private $username = "root";
    private $password = "root";
    public $conn;

    public function getConnection() {

        $this->conn = null;

        try {
            $this->conn = new PDO($this->db_lib .":host=". $this->host .";dbname=". $this->db_name, $this->username, $this->password);
            $this->conn->exec("SET NAMES utf8");
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }
}

?>
