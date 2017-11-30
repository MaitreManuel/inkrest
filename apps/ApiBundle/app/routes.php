<?php

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app->get('/', function () {
    return new Response('
        <h1> Index of /inkrest </h1>
        <br/>
        <table style="font-size:18px;text-align:center;width:300px;">
            <tr>
                <th style="width:25%;">Method</th>
                <th style="width:25%;">API Route</th>
                <th style="width:25%;">Access</th>
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
                <td><a href="http://api.inkrest.fr/users/1" target="_blank">&#10138;</a></td>
            </tr>
            <tr>
                <td>POST</td>
                <td>/users/create</td>
                <td><a href="http://api.inkrest.fr/users/create" target="_blank">&#10138;</a></td>
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
    $response = $app['dao.user']->create($firstname, $lastname, $mail, $password, $is_admin);

    return new JsonResponse($response);
});
