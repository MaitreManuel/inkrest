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

        if(empty($mail)) {
            throw new RuntimeException("Cannot take empty or null value for the \"mail\" parameter");
        } else {
            $sql = "SELECT * FROM user WHERE mail = '". $mail ."'";
            $result = $this->db->fetchAssoc($sql);
        }

        return $result;
    }

    /**
     * Check if user is connected
     *
     * @param $mail is need to find user
     * @return \ApiBundle\Service\Response
     */
    public function can_access($mail, $asker_token) {
        $result = "";

        if(!empty($mail) && !empty($asker_token)) {
            $user = $this->findByMail($mail);
            $token = $user['token'];
            $token_date = date_create($user['token_date']);
            $now = date_create(date('Y-m-d H:i:s'));
            $interval = date_diff($now, $token_date);

            if(strcmp($user['account_status'], "active") !== 0) {
                $result = $this->response->unauthorized("Your account is not active, you can't make request");
            } else if(strcmp($asker_token, $token) === 0) {
                if(intval($interval->format('%h')) < 6) {
                    $data = array(
                        'token_date' => date('Y-m-d H:i:s')
                    );
                    $identifier = array(
                        'mail' => $user['mail']
                    );
                    $this->update($data, $identifier);
                    $result = $this->response->ok("Access authorized");
                } else {
                    $this->disconnect($mail);
                    $result = $this->response->unauthorized("Token too old, you've been disconnected.");
                }
            } else {
                $result = $this->response->unauthorized("You need to be connected to do this action.");
            }
        } else {
            throw new RuntimeException("Cannot take empty or null value for \"mail\" and/or \"asker_token\" parameter");
        }

        return $result;
    }

    /**
     * Check if user is connected and admin
     *
     * @param $mail is need to find user
     * @return \ApiBundle\Service\Response
     */
     public function can_access_admin($mail, $asker_token) {
         $result = "";

         if(!empty($mail) && !empty($asker_token)) {
             $user = $this->findByMail($mail);

             if(strcmp($user['account_status'], "active") !== 0) {
                 $result = $this->response->unauthorized("Your account is not active, you can't make request");
             } else if(strcmp($user['is_admin'], "true") === 0) {
                 $user = $this->findByMail($mail);
                 $token = $user['token'];
                 $token_date = date_create($user['token_date']);
                 $now = date_create(date('Y-m-d H:i:s'));
                 $interval = date_diff($now, $token_date);

                 $datetime1 = new \DateTime($user['token_date']);
                 $datetime2 = new \DateTime(date('Y-m-d H:i:s'));
                 $interval = $datetime1->diff($datetime2);
                 var_dump($interval->format('%h'));die();

                 if(strcmp($asker_token, $token) === 0) {
                     if(intval($interval->format('%h')) < 6) {
                         $data = array(
                             'token_date' => date('Y-m-d H:i:s')
                         );
                         $identifier = array(
                             'mail' => $user['mail']
                         );
                         $this->update($data, $identifier);
                         $result = $this->response->ok("Access authorized");
                     } else {
                         $this->disconnect($mail);
                         $result = $this->response->unauthorized("Token too old, you've been disconnected.");
                     }
                 } else {
                     $result = $this->response->unauthorized("Token invalid.");
                 }
             } else {
                 $result = $this->response->unauthorized("You need administrator rights to execute this action");
             }
         } else {
             throw new RuntimeException("Cannot take empty or null value for \"mail\" and/or \"asker_token\" parameter");
         }

         return $result;
     }

    public function connect($mail, $password) {
        $result = "";

        if(empty($mail)) {
            $result = $this->response->bad_request("Cannot take empty or null value for the \"mail\" parameter");
        } else if(empty($password)) {
            $result = $this->response->bad_request("Cannot take empty or null value for the \"password\" parameter");
        } else {
            $user = $this->findByMail($mail);
            $hash_password_given = $this->encode->testPassword($password, $user['salt']);

            if(strcmp($user['account_status'], "active") !== 0) {
                $result = $this->response->unauthorized("Your account is not active, you can't make request");
            } else if(!empty($user['token']) && !empty($user['token_date'])) {
                $token_date = date_create($user['token_date']);
                $now = date_create(date('Y-m-d H:i:s'));
                $interval = date_diff($now, $token_date);

                if(intval($interval->format('%h')) < 6) {
                    $result = $this->response->teapot("I'm a teapot and I'm already connected !");
                } else {
                    $this->disconnect($mail);
                    $result = $this->response->unauthorized("Token too old, you've been disconnected.");
                }
            } else if($user) {
                if(strcmp($hash_password_given, $user['hashedPassword']) === 0) {
                    $token = $this->encode->generateToken($mail);
                    $data = array(
                        'token' => $token,
                        'token_date' => date('Y-m-d H:i:s')
                    );
                    $identifier = array(
                        'mail' => $mail
                    );
                    $this->update($data, $identifier);
                    $result = $this->response->ok("Successfully connected", $token);
                } else {
                    $result = $this->response->bad_request("Password not match");
                }
            } else {
                $result = $this->response->not_found("User ". $mail ." not found");
            }
        }

        return $result;
    }

    public function create($firstname, $lastname, $mail, $password, $is_admin) {
        $result = "";

        if(empty($firstname)) {
            $result = $this->response->bad_request("Cannot take empty or null value for the \"firstname\" parameter");
        } else if(empty($lastname)) {
            $result = $this->response->bad_request("Cannot take empty or null value for the \"lastname\" parameter");
        } else if(empty($password)) {
            $result = $this->response->bad_request("Cannot take empty or null value for the \"password\" parameter");
        } else if(empty($is_admin)) {
            $result = $this->response->bad_request("Cannot take empty or null value for the \"is_admin\" parameter");
        } else {
            $if_exist = $this->findByMail($mail);

            if($if_exist) {
                $result = $this->response->bad_request("User already exist");
            } else {
                $encode_pwd = $this->encode->hashPassword($password);
                $values = array(
                    'firstname' => $firstname,
                    'lastname' => $lastname,
                    'mail' => $mail,
                    'is_admin' => $is_admin,
                    'hashedPassword' => $encode_pwd['hashedPassword'],
                    'salt' => $encode_pwd['salt'],
                    'account_status' => 'active'
                );
                $result = $this->db->insert('user', $values);
            }
        }

        return $result;
    }

    public function disconnect($mail) {
        $result = "";

        if(empty($mail)) {
            $result = $this->response->bad_request("Cannot take empty or null value for the \"firstname\" parameter");
        } else {
            $user_connected = $this->findByMail($mail);

            if(!empty($user_connected['token']) && !empty($user_connected['token_date'])) {
                $data = array(
                    'token' => NULL,
                    'token_date' => NULL
                );
                $identifier = array(
                    'mail' => $user_connected['mail']
                );
                $this->update($data, $identifier);
                $result = $this->response->ok();
            } else {
                $result = $this->response->teapot("I'm a teapot and I'm already disconnected !");
            }
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

        if(empty($id)) {
            $user = $this->response->bad_request("Cannot take empty or null value for the \"id\" parameter");
        } else {
            $sql = "SELECT id, firstname, lastname, mail, is_admin FROM user WHERE id = ". $id;
            $user = $this->db->fetchAssoc($sql);

            if(!$user) {
                $user = $this->response->not_found("User with id ". $id ." not existing");
            }
        }

        return $user;
    }

    public function update($data, $identifier) {
        $result = "";

        if(empty($data)) {
            throw new RuntimeException("Cannot take empty or null value for the \"data\" parameter");
        } else if(empty($identifier)) {
            throw new RuntimeException("Cannot take empty or null value for the \"identifier\" parameter");
        } else {
            $this->db->update('user', $data, $identifier);
            $result = $this->response->ok("Update successfull");
        }

        return $result;
    }
}
