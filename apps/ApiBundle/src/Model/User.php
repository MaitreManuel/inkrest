<?php

namespace ApiBundle\Model;

use Doctrine\DBAL\Connection;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Exception\RuntimeException;

use ApiBundle\Service\Encoder;
use ApiBundle\Service\Response;

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
     * @var \ApiBundle\Service\Encoder
     */
    private $encode;

    /**
     * Service server response
     *
     * @var \ApiBundle\Service\Response
     */
    private $response;

    /**
     * Constructor
     *
     * @param \Doctrine\DBAL\Connection The database connection object
     */
    public function __construct(Connection $db) {
        $this->db = $db;
        $this->encode = new Encoder();
        $this->response = new Response();
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
            $sql = "SELECT * FROM user WHERE mail = '". $mail ."'";
            $result = $this->db->fetchAssoc($sql);
        }

        return $result;
    }

    public function connect($mail, $password) {
        $token = "";

        if(!isset($mail)) {
            $token = $this->response->bad_request("Cannot take empty or null value for the \"mail\" parameter");
        } else if(!isset($password)) {
            $token = $this->response->bad_request("Cannot take empty or null value for the \"password\" parameter");
        } else {
            $user = $this->findByMail($mail);
            $hash_password_given = $this->encode->testPassword($password, $user['salt']);

            if($user) {
                if(strcmp($hash_password_given, $user['hashedPassword']) === 0) {
                    $token = $this->encode->generateToken($mail);
                    $data = array(
                        'token' => $token,
                        'token_life' => date('Y-m-d h:i:s')
                    );
                    $identifier = array(
                        'mail' => $mail
                    );
                    $this->update($data, $identifier);
                } else {
                    $token = $this->response->bad_request("Password not match");
                }
            } else {
                $token = $this->response->not_found("User ". $mail ." not found");
            }
        }

        return $token;
    }

    public function create($firstname, $lastname, $mail, $password, $is_admin) {
        $result = "";
        $if_exist = $this->findByMail($mail);

        if($if_exist) {
            $result = $this->response->bad_request("User already exist");
        } else if(!isset($firstname)) {
            $result = $this->response->bad_request("Cannot take empty or null value for the \"firstname\" parameter");
        } else if(!isset($lastname)) {
            $result = $this->response->bad_request("Cannot take empty or null value for the \"lastname\" parameter");
        } else if(!isset($password)) {
            $result = $this->response->bad_request("Cannot take empty or null value for the \"password\" parameter");
        } else if(!isset($is_admin)) {
            $result = $this->response->bad_request("Cannot take empty or null value for the \"is_admin\" parameter");
        } else {
            $encode_pwd = $this->encode->hashPassword($password);
            $values = array(
                'firstname' => $firstname,
                'lastname' => $lastname,
                'mail' => $mail,
                'hashedPassword' => $encode_pwd['hashedPassword'],
                'salt' => $encode_pwd['salt'],
                'is_admin' => $is_admin
            );
            $result = $this->db->insert('user', $values);
        }

        return $result;
    }

    public function findAll() {
        $users = "";

        $sql = "SELECT id, firstname, lastname, mail, is_admin FROM user";
        $result = $this->db->fetchAll($sql);

        if(!$result) {
            $users = $this->response->bad_request("Users not existing");
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
            $user = $this->response->bad_request("Cannot take empty or null value for the \"id\" parameter");
        } else {
            $sql = "SELECT id, firstname, lastname, mail, is_admin FROM user WHERE id = ". $id;
            $result = $this->db->fetchAssoc($sql);

            if(!$result) {
                $user = $this->response->not_found("User with id ". $id ." not existing");
            } else {
                $user = $this->buildUser($result);
            }
        }

        return $user;
    }

    public function update($data, $identifier) {
        $result = "";

        if(!isset($data)) {
            throw new RuntimeException("Cannot take empty or null value for the \"data\" parameter");
        } else if(!isset($identifier)) {
            throw new RuntimeException("Cannot take empty or null value for the \"identifier\" parameter");
        } else {
            $result = $this->db->update('user', $data, $identifier);
        }

        return $result;
    }
}
