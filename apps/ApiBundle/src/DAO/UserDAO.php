<?php

namespace ApiBundle\DAO;

use Doctrine\DBAL\Connection;
use ApiBundle\Model\User;

class UserDAO {
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

    public function findAll() {
        $sql = "SELECT firstname, lastname, id, mail, password, is_admin FROM user";
        $result = $this->db->fetchAll($sql);

        $users = array();
        foreach ($result as $row) {
            // var_dump($row);die();
            $userId = $row['id'];
            $users[$userId] = $this->buildUser($row);
        }
        return $users;
    }

    /**
     * Creates an User object based on a DB row.
     *
     * @param array $row The DB row containing User data.
     * @return \ApiBundle\Model\User
     */
    private function buildUser(array $row) {
        $user = new User();
        $user->setId($row['id']);
        $user->setFirstname($row['firstname']);
        $user->setLastname($row['lastname']);
        $user->setMail($row['mail']);
        $user->getPassword($row['password']);
        $user->getIsAdmin($row['isAdmin']);

        return $user;
    }
}
