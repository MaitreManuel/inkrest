<?php

namespace ApiBundle\Model;

use Doctrine\DBAL\Connection;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class User {
    /**
     * Database connection
     *
     * @var \Doctrine\DBAL\Connection
     */
    private $db;

    /**
     * Constructor
     *
     * @param \Doctrine\DBAL\Connection The database connection object
     */
    public function __construct(Connection $db) {
        $this->db = $db;
    }

    /**
     * Creates an User object based on a DB row.
     *
     * @param array $row The DB row containing User data.
     * @return \ApiBundle\Model\User
     */
    private function buildUser(array $row) {
        $user = array(
            'id' => $row['id'],
            'firstname' => $row['firstname'],
            'lastname' => $row['lastname'],
            'mail' => $row['mail'],
            'password' => $row['password'],
            'is_admin' => $row['is_admin'],
        );

        return $user;
    }

    public function create($firstname, $lastname, $mail, $password, $is_admin) {
        $sql = "INSERT INTO user (firstname, lastname, mail, password, is_admin)
                VALUES ". $firstname .", ". $lastname .", ". $mail .", ". $password .", ". $is_admin;

        $result = $this->db->insert($sql);
    }

    public function findAll() {
        $sql = "SELECT * FROM user";
        $result = $this->db->fetchAll($sql);

        if(!$result) {
            throw new NotFoundHttpException("User with id ". $id ." not existing");
        } else {
            $users = array();
            foreach ($result as $row) {
                $users[$row['id']] = $this->buildUser($row);
            }
        }

        return $users;
    }

    public function findById($id) {
        $sql = "SELECT * FROM user WHERE id = ". $id;
        $result = $this->db->fetchAssoc($sql);

        if(!$result) {
            throw new NotFoundHttpException("User with id ". $id ." not existing");
        } else {
            $user = $this->buildUser($result);
        }

        return $user;
    }
}
