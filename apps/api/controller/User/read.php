<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../config/database.php';
include_once '../../model/user.php';

$database = new Database();
$db = $database->getConnection();

$user = new User($db);

$stmt = $user->readAll();
$num = $stmt->rowCount();

if($num > 0) {

    $users_arr = array();
    $users_arr["records"] = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        extract($row);

        $item = array(
            "firstname" => $lastname,
            "lastname" => $firstname,
            "id" => $id,
            "mail" => $mail,
            "password" => $password,
            "is_admin" => $is_admin
        );

        array_push($users_arr["records"], $item);
    }

    echo json_encode($users_arr);
}

else {
    echo json_encode(
        array("message" => "No users found.")
    );
}

?>
