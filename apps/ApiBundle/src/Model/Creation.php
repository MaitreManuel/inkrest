<?php

namespace ApiBundle\Model;

use Doctrine\DBAL\Connection;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\Exception\RuntimeException;

use ApiBundle\Service\Response;

class Creation {
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

    public function addCreation($author, $name, $description, $format, $anchors, $image)
    {
        $values = array(
            'author' => $author,
            'name' => $name,
            'description' => $description,
            'format' => $format,
            'anchors' => $anchors,
            'image' => $image,
            'nbBuy' => 0,
            'status' => 'need_approval'
        );
        $result = $this->db->insert('item', $values);

        return $result;
    }
}
