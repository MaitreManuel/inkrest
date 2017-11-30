<?php

namespace ApiBundle\Model;

use Doctrine\DBAL\Connection;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Exception\RuntimeException;

use ApiBundle\Service\HashPassword;

class User {
    /**
     * Database connection
     *
     * @var \Doctrine\DBAL\Connection
     */
    private $db;

    /**
     * Service hash password
     *
     * @var \ApiBundle\Service\HashPassword
     */
    private $hash;

    /**
     * Constructor
     *
     * @param \Doctrine\DBAL\Connection The database connection object
     */
    public function __construct(Connection $db, HashPassword $hash) {
        $this->db = $db;
        $this->hash = $hash;
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
            'is_admin' => $row['is_admin'],
        );

        return $user;
    }

    /**
     * Get if User exist by his mail
     *
     * @param array $result The DB row containing User data.
     * @return \ApiBundle\Model\User
     */
    private function findByMail($mail) {
        $result = "";

        if(!isset($mail)) {
            throw new RuntimeException("Cannot take empty or null value for the \"mail\" parameter");
        } else {
            $sql = "SELECT id, mail FROM user WHERE mail = '". $mail ."'";
            $result = $this->db->fetchAssoc($sql);
        }

        return $result;
    }

    public function connect($mail, $password) {
        $token = "";


        return $token;
    }

    public function create($firstname, $lastname, $mail, $password, $is_admin) {
        $result = "";
        $if_exist = $this->findByMail($mail);

        if($if_exist) {
            throw new RuntimeException("User already exist !");
        } else if(!isset($firstname)) {
            throw new RuntimeException("Cannot take empty or null value for the \"firstname\" parameter");
        } else if(!isset($lastname)) {
            throw new RuntimeException("Cannot take empty or null value for the \"lastname\" parameter");
        } else if(!isset($password)) {
            throw new RuntimeException("Cannot take empty or null value for the \"password\" parameter");
        } else if(!isset($is_admin)) {
            throw new RuntimeException("Cannot take empty or null value for the \"is_admin\" parameter");
        } else {
            \var_dump('here');die();
            $encrypt_pwd = $this->hash->hashPassword($password);
            $values = array('firstname' => $firstname, 'lastname' => $lastname, 'mail' => $mail, 'hashedPassword' => $encrypt_pwd['hashedPassword'], 'salt' => $encrypt_pwd['salt'], 'is_admin' => $is_admin);
            $result = $this->db->insert('user', $values);
        }

        return $result;
    }

    public function findAll() {
        $users = "";

        $sql = "SELECT id, firstname, lastname, mail, is_admin FROM user";
        $result = $this->db->fetchAll($sql);

        if(!$result) {
            throw new NotFoundHttpException("Users not existing");
        } else {
            $users = array();
            foreach ($result as $row) {
                $users[$row['id']] = $this->buildUser($row);
            }
        }

        return $users;
    }

    public function findById($id) {
        $user = "";

        if(!isset($id)) {
            throw new RuntimeException("Cannot take empty or null value for the \"id\" parameter");
        } else {
            $sql = "SELECT id, firstname, lastname, mail, is_admin FROM user WHERE id = ". $id;
            $result = $this->db->fetchAssoc($sql);

            if(!$result) {
                throw new NotFoundHttpException("User with id ". $id ." not existing");
            } else {
                $user = $this->buildUser($result);
            }
        }

        return $user;
    }
}
