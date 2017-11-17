<?php

    $dblib='mysql';
    $hostname='localhost';
    $dbname='inkrest';

    $user='root';
    $password='root';

    try {
        echo '-- Connection -- ';
        $db = new PDO($dblib.':host='.$hostname.';dbname='.$dbname.'', $user, $password);
        echo '-- PDO -- ';
        $db->exec('SET NAMES utf8');
        echo '-- Success -- ';
    } catch(Exception $e) {
        echo 'Erreur : '. $e->getMessage();
    }

    $response = $db->query('SELECT * FROM articles');

    while ($datas = $response->fetch()) {
	       echo '-- '. $datas['article_title'] .' -- ';
    }

?>
