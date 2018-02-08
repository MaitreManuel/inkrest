<?php

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app->get('/', function () {
    return new Response('
        <h1> Index of inkrest/ </h1>
        <a href="http://inkrest.fr/">Front-office here</a>
    ');
});

$app->get('/format', function () use ($app) {
    $formats = $app['dao.format']->findAll();

    return new JsonResponse($formats);
});

$app->get('/last_product', function () use ($app) {
    $product = $app['dao.product']->findLast();

    return new JsonResponse($product);
});

$app->get('/products', function () use ($app) {
    $product = $app['dao.product']->findAll();

    return new JsonResponse($product);
});

$app->post('/creation', function(Request $request) use ($app) {
    $asker = $request->get('mail');
    $asker_token = $request->get('token');

    $name = $request->get('name');
    $description = $request->get('description');
    $format = $request->get('format');
    $anchors = $request->get('anchors');
    $image = $request->get('image');

    if(!empty($asker) && !empty($asker_token) && !empty($name) && !empty($description) && !empty($format) && !empty($anchors) && !empty($image)) {
        $access = $app['dao.user']->can_access($asker, $asker_token);
        if(strcmp($access['status'], "success") === 0) {
            $creation = $app['dao.creation']->addCreation($asker, $name, $description, $format, $anchors, $image);
        } else {
            $creation = $access;
        }
    } else {
        throw new RuntimeException("Cannot take empty or null value for the asker \"mails\", asker \"token\" or data parameters");
    }

    return new JsonResponse($creation);
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
    $birthday = $request->get('birthday');

    $response = $app['dao.user']->create($firstname, $lastname, $mail, $password, $is_admin, $birthday);

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
