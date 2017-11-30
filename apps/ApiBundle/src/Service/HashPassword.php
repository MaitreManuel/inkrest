<?php

namespace ApiBundle\Service;

class HashPassword {
    /**
     * Creates an hashed password
     *
     * @param array $safetiest_password containing salt and hashed password.
     * @return \ApiBundle\Model\User
     */
    private function hashPassword($password) {
        $salt = md5(uniqid(null, true));
        $hashedPassword = sha1(sha1($password) . $salt);

        $safetiest_password = array(
            'salt' => $salt,
            'hashedPassword' => $hashedPassword,
        );

        return $safetiest_password;
    }
}
