<?php

$app->get('/', function () use ($app) {
    $users = $app['dao.user']->findAll();

    return $users;
});
