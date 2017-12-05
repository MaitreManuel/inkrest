<?php

namespace ApiBundle\Service;

class Encoder {
    /**
     * Database connection
     *
     * @var \Doctrine\DBAL\Connection
     */
    private $php_salt;

    /**
     * Constructor
     */
    public function __construct() {
        $this->php_salt = "86121a508fb89116629fb0a872b15a137cb26be28f28a15cff0899726071713fdc8d98d763e111e888550c301c1cd6271e88baa6c1c59c12fbf0883495a8afc5";
    }

    /**
     * Creates a token with mail user
     *
     * @param array $token containing token create with mail user
     * @return \ApiBundle\Service\
     */
    public function generateToken($mail) {
        $token = md5(uniqid($mail.$this->php_salt, true));

        return $token;
    }

    /**
     * Creates an hashed password
     *
     * @param array $safetiest_password containing salt and hashed password.
     * @return \ApiBundle\Service\
     */
    public function hashPassword($password) {
        $salt = md5(uniqid(null, true));
        $hashedPassword = sha1(sha1($password) . $salt . $this->php_salt);

        $safetiest_password = array(
            'salt' => $salt,
            'hashedPassword' => $hashedPassword,
        );

        return $safetiest_password;
    }

    /**
     * Test an hashed password
     *
     * @param array $password_tested containing hashedPassword.
     * @return \ApiBundle\Service\
     */
    public function testPassword($password, $salt) {
        $password_tested = sha1(sha1($password) . $salt . $this->php_salt);

        return $password_tested;
    }
}
