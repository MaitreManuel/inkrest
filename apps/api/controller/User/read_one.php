<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../config/database.php';
include_once '../../model/user.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$mail = isset($_POST['mail']) ? $_POST['mail'] : die();
$password = isset($_POST['password']) ? $_POST['password'] : die();

$stmt = $user->readOne($mail, $password);
$num = $stmt->rowCount();

if($num > 0) {

    $extract = $stmt->fetch(PDO::FETCH_ASSOC);
    extract($extract);

    $item = array(
        "firstname" => $firstname,
        "lastname" => $lastname,
        "id" => $id,
        "mail" => $mail,
        "is_admin" => $is_admin
    );

    echo json_encode($item);
}

else {
    echo json_encode(
        array("message" => "No users found.")
    );
}

?>
