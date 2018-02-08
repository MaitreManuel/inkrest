<?php

use Symfony\Component\Debug\ErrorHandler;
use Symfony\Component\Debug\ExceptionHandler;

// Register global error and exception handlers
ErrorHandler::register();
ExceptionHandler::register();

// Register service providers.
$app->register(new Silex\Provider\DoctrineServiceProvider());

// Register services.
$app['dao.user'] = function ($app) {
    return new ApiBundle\Model\User($app['db']);
};

$app['dao.creation'] = function ($app) {
    return new ApiBundle\Model\Creation($app['db']);
};

$app['dao.format'] = function ($app) {
    return new ApiBundle\Model\Format($app['db']);
};

$app['dao.product'] = function ($app) {
    return new ApiBundle\Model\Product($app['db']);
};
