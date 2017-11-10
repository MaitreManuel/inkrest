<?php

class User {

    private $conn;
    private $table_name = "user";

    public $id;
    public $firstname;
    public $lastname;
    public $mail;
    public $password;
    public $is_admin;

    public function __construct($db) {
        $this->conn = $db;
    }

    function readAll() {
        $query = "SELECT
                    firstname,
                    lastname,
                    id,
                    mail,
                    password,
                    is_admin
                    FROM ". $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();

        return $stmt;
    }

    function readOne($mail, $password) {
        $query = "SELECT
                    firstname,
                    lastname,
                    id,
                    mail,
                    is_admin
                    FROM ". $this->table_name ." WHERE mail = :mail AND password = :password";
        $stmt = $this->conn->prepare($query);
        $stmt->execute(array(
            'mail' => $mail,
            'password' => $password
        ));

        return $stmt;
    }
}

?>
