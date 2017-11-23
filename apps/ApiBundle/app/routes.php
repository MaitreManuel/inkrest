<?php

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app->get('/', function () {
    return new Response('What\'s up homie ?');
});

$app->get('/users', function () use ($app) {
    $users = $app['dao.user']->findAll();

    return new JsonResponse($users);
});

$app->get('/users/{id}', function ($id) use ($app) {
    $user = $app['dao.user']->findById($id);

    return new JsonResponse($user);
});

$app->create('/users', function (Request $request) use ($app) {
    $user = $app['dao.user']->create($id);

    return new JsonResponse($user);
});
