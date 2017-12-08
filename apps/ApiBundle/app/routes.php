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

$app->get('/users/{asker}/{asker_token}', function ($asker, $asker_token) use ($app) {
    $users = "";

    if(!empty($asker) && !empty($asker_token)) {
        $access = $app['dao.user']->can_access_admin($asker, $asker_token);

        if(strcmp($access['status'], "success") === 0) {
            $users = $app['dao.user']->findAll();
        } else {
            $users = $access;
        }
    } else {
        throw new RuntimeException("Cannot take empty or null value for the asker \"mail\" or asker \"token\" parameter");
    }

    return new JsonResponse($users);
});

$app->get('/users/{asker}/{asker_token}/{id}', function ($asker, $asker_token, $id) use ($app) {
    $users = "";

    if(!empty($asker) && !empty($asker_token)) {
        $access = $app['dao.user']->can_access_admin($asker, $asker_token);

        if(strcmp($access['status'], "success") === 0) {
            $user = $app['dao.user']->findById($id);
        } else {
            $user = $access;
        }
    } else {
        throw new RuntimeException("Cannot take empty or null value for the asker \"mail\" or asker \"token\" parameter");
    }

    return new JsonResponse($user);
});

$app->post('/users/create', function (Request $request) use ($app) {
    $firstname = $request->get('firstname');
    $lastname = $request->get('lastname');
    $mail = $request->get('mail');
    $password = $request->get('password');
    $is_admin = $request->get('is_admin');

    $response = $app['dao.user']->create($firstname, $lastname, $mail, $password, $is_admin);

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

$app->post('/users/update', function (Request $request) use ($app) {
    $update = "";
    $data = json_decode($request->get('data'), true);
    $asker = $request->get('mail');
    $asker_token = $request->get('asker_token');
    $to_update = $request->get('to_update');

    if(!empty($asker) && !empty($asker_token) && !empty($data) && !empty($to_update)) {
        if(strcmp($asker, $to_update) !== 0) {
            $response = $app['dao.user']->can_access_admin($asker, $asker_token);
        } else {
            $response = $app['dao.user']->can_access($asker, $asker_token);
        }
        if(strcmp($response['status'], "success") === 0) {
            $identifier = array(
                'mail' => $to_update
            );
            $update = $app['dao.user']->update($data, $identifier);
        } else {
            $update = $response;
        }
    } else {
        throw new RuntimeException("Cannot take empty or null value for the asker \"mails\", asker \"token\" or data parameter");
    }


    return new JsonResponse($update);
});
