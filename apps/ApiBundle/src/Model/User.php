<?php

namespace ApiBundle\Model;

class User {
    /**
     * User id.
     *
     * @var string
     */
    private $id;

    /**
     * User firstname.
     *
     * @var string
     */
    private $firstname;

    /**
     * User lastname.
     *
     * @var string
     */
    private $lastname;

    /**
     * User mail.
     *
     * @var string
     */
    private $mail;

    /**
     * User password.
     *
     * @var string
     */
    private $password;

    /**
     * User is_admin.
     *
     * @var string
     */
    private $is_admin;

    public function getId() {
        return $this->$id;
    }

    public function setId($id) {
        $this->$id = $id;
        return $this;
    }

    public function getFirstname() {
        return $this->$firstname;
    }

    public function setFirstname($firstname) {
        $this->$firstname = $firstname;
        return $this;
    }

    public function getLastname() {
        return $this->$lastname;
    }

    public function setLastname($lastname) {
        $this->$lastname = $lastname;
        return $this;
    }

    public function getMail() {
        return $this->$mail;
    }

    public function setMail($mail) {
        $this->$mail = $mail;
        return $this;
    }

    public function getPassword() {
        return $this->$password;
    }

    public function setPassword($password) {
        $this->$password = $password;
        return $this;
    }

    public function getIsAdmin() {
        return $this->$is_admin;
    }

    public function setIsAdmin($is_admin) {
        $this->$is_admin = $is_admin;
        return $this;
    }
}
