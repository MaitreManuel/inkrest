<?php

namespace ApiBundle\Service;

class Encoder {
    /**
     * Creates a token with mail user
     *
     * @param array $token containing token create with mail user
     * @return \ApiBundle\Service\
     */
    public function generateToken($mail) {
        $token = md5(uniqid($mail, true));

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
        $hashedPassword = sha1(sha1($password) . $salt);

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
        $password_tested = sha1(sha1($password) . $salt);

        return $password_tested;
    }
}
