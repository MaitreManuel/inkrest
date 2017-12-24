<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE,OPTIONS");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    require_once __DIR__.'/../vendor/autoload.php';

    $app = new Silex\Application();

    // enable the debug mode
    $app['debug'] = true;

    require __DIR__.'/../app/config/dev.php';
    require __DIR__.'/../app/app.php';
    require __DIR__.'/../app/routes.php';

    $app->run();
