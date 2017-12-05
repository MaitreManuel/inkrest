<?php

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app->get('/', function () {
    return new Response('
        <h1> Index of inkrest/ </h1>
        <br/>
        <table style="font-size:18px;text-align:center;width:300px;">
            <tr>
                <th style="width:33,33333%;">Method</th>
                <th style="width:33,33333%;">API Route</th>
                <th style="width:33,33333%;">Access</th>
            </tr>
            <tr>
                <td>GET</td>
                <td>/</td>
                <td><a href="http://api.inkrest.fr/">&#10138;</a></td>
            </tr>
            <tr>
                <td>GET</td>
                <td>/users</td>
                <td><a href="http://api.inkrest.fr/users" target="_blank">&#10138;</a></td>
            </tr>
            <tr>
                <td>GET</td>
                <td>/users/{id}</td>
                <td><a href="http://api.inkrest.fr/users/7" target="_blank">&#10138;</a></td>
            </tr>
            <tr>
                <td>POST</td>
                <td>/users/create</td>
                <td><a href="http://api.inkrest.fr/users/create" target="_blank">&#10138;</a></td>
            </tr>
            <tr>
                <td>POST</td>
                <td>/users/connect</td>
                <td><a href="http://api.inkrest.fr/users/connect" target="_blank">&#10138;</a></td>
            </tr>
            <tr>
                <td>POST</td>
                <td>/users/disconnect</td>
                <td><a href="http://api.inkrest.fr/users/disconnect" target="_blank">&#10138;</a></td>
            </tr>
        </table>
    ');
});

$app->get('/users', function () use ($app) {
    $users = $app['dao.user']->findAll();

    return new JsonResponse($users);
});

$app->get('/users/{id}', function ($id) use ($app) {
    $user = $app['dao.user']->findById($id);

    return new JsonResponse($user);
});

$app->post('/users/create', function (Request $request) use ($app) {
    $response = "";
    $asker = $request->get('asker');
    $asker_token = $request->get('asker_token');

    if(!empty($asker) && !empty($asker_token)) {
        $access = $app['dao.user']->can_access_admin($asker, $asker_token);

        if(strcmp($access['status'], "success") === 0) {
            $firstname = $request->get('firstname');
            $lastname = $request->get('lastname');
            $mail = $request->get('mail');
            $password = $request->get('password');
            $is_admin = $request->get('is_admin');

            $response = $app['dao.user']->create($firstname, $lastname, $mail, $password, $is_admin);
        } else {
            $response = $access;
        }
    } else {
        throw new RuntimeException("Cannot take empty or null value for the asker \"mail\" or asker \"token\" parameter");
    }


    return new JsonResponse($response);
});

$app->post('/users/connect', function (Request $request) use ($app) {
    $mail = $request->get('mail');
    $password = $request->get('password');

    $response = $app['dao.user']->connect($mail, $password);

    return new JsonResponse($response);
});

$app->post('/users/disconnect', function (Request $request) use ($app) {
    $mail = $request->get('mail');
    $response = $app['dao.user']->disconnect($mail);

    return new JsonResponse($response);
});
