<?php

namespace ApiBundle\Model;

use Doctrine\DBAL\Connection;

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

    public function create() {
        $sql = "INSERT INTO user () VALUES ";
    }

    public function findAll() {
        $sql = "SELECT * FROM user";
        $result = $this->db->fetchAll($sql);

        $users = array();
        foreach ($result as $row) {
            $users[$row['id']] = $this->buildUser($row);
        }

        return $users;
    }

    public function findById($id) {
        $sql = "SELECT * FROM user WHERE id = ". $id;
        $result = $this->db->fetchAssoc($sql);

        $user = $this->buildUser($result);

        return $user;
    }
}
