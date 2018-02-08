<?php

namespace ApiBundle\Model;

use Doctrine\DBAL\Connection;

use ApiBundle\Service\Response;

class Product {
    /**
     * Database connection
     *
     * @var \Doctrine\DBAL\Connection
     */
    private $db;

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
        $this->response = new Response();
    }

    /**
     * Creates an User object based on a DB row.
     *
     * @param array $row The DB row containing User data.
     * @return Array
     */
    private function buildFormat(array $row) {
        $produit = array(
            'id' => $row['id'],
            'author' => $row['author'],
            'name' => $row['name'],
            'description' => $row['description'],
            'format' => $row['format'],
            'anchors' => $row['anchors'],
            'image' => $row['image'],
        );

        return $produit;
    }

    public function findOne($id) {
        $product = "";

        $sql = "SELECT * FROM item WHERE id=". $id;
        $product = $this->db->fetchAll($sql);

        if(!$product) {
            $product = $this->response->bad_request("Product not existing");
        }

        return $product;
    }

    public function findLast() {
        $product = "";

        $sql = "SELECT * FROM item ORDER BY id DESC LIMIT 3";
        $product = $this->db->fetchAll($sql);

        if(!$product) {
            $product = $this->response->bad_request("Products not existing");
        }

        return $product;
    }

    public function findAll() {
        $products = "";

        $sql = "SELECT * FROM item ORDER BY id DESC";
        $result = $this->db->fetchAll($sql);

        if(!$result) {
            $products = $this->response->bad_request("Products not existing");
        } else {
            $products = array();
            foreach ($result as $row) {
                $products[$row['id']] = $this->buildFormat($row);
            }
        }

        return $products;
    }
}
