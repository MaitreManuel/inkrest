<?php

namespace ApiBundle\Model;

use Doctrine\DBAL\Connection;

use ApiBundle\Service\Response;
use PhpParser\Node\Expr\Array_;

class Format {
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
        $format = array(
            'id' => $row['id'],
            'name' => $row['name'],
            'dimensions' => $row['dimensions'],
            'price' => $row['price'],
            'iconPath' => $row['iconPath'],
        );

        return $format;
    }

    public function findAll() {
        $formats = "";

        $sql = "SELECT * FROM format";
        $result = $this->db->fetchAll($sql);

        if(!$result) {
            $formats = $this->response->bad_request("Formats not existing");
        } else {
            $formats = array();
            foreach ($result as $row) {
                $formats[$row['id']] = $this->buildFormat($row);
            }
        }

        return $formats;
    }
}
