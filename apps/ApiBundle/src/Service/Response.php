<?php

namespace ApiBundle\Service;

class Response {
    public function ok($message = '', $token = '') {
        $response = array(
            'code' => 200,
            'status' => 'success',
            'message' => "Success request"
        );
        if(!empty($message)) {
            $response['message'] = $message;
        }
        if(!empty($token)) {
            $response['token'] = $token;
        }

        return $response;
    }

    public function bad_request($message = '') {
        $response = array(
            'code' => 400,
            'status' => 'error',
            'message' => "Synthax error"
        );
        if(!empty($message)) {
            $response['message'] = $message;
        }

        return $response;
    }

    public function unauthorized($message = '') {
        $response = array(
            'code' => 401,
            'status' => 'error',
            'message' => "Authentification required to access resources"
        );
        if(!empty($message)) {
            $response['message'] = $message;
        }

        return $response;
    }

    public function forbidden($message = '') {
        $response = array(
            'code' => 403,
            'status' => 'error',
            'message' => "You don't have permission to access this resources"
        );
        if(!empty($message)) {
            $response['message'] = $message;
        }

        return $response;
    }

    public function not_found($message = '') {
        $response = array(
            'code' => 404,
            'status' => 'error',
            'message' => "Resources not found"
        );
        if(!empty($message)) {
            $response['message'] = $message;
        }

        return $response;
    }

    public function method_not_allowed($message = '') {
        $response = array(
            'code' => 405,
            'status' => 'error',
            'message' => "Request method not allowed"
        );
        if(!empty($message)) {
            $response['message'] = $message;
        }

        return $response;
    }

    public function teapot($message = '') {
        $response = array(
            'code' => 418,
            'status' => 'error',
            'message' => "I'm a teapot!"
        );
        if(!empty($message)) {
            $response['message'] = $message;
        }

        return $response;
    }

    public function internal_server_error($message = '') {
        $response = array(
            'code' => 500,
            'status' => 'error',
            'message' => "Internal error server"
        );
        if(!empty($message)) {
            $response['message'] = $message;
        }

        return $response;
    }

    public function service_unavailable($message = '') {
        $response = array(
            'code' => 500,
            'status' => 'error',
            'message' => "Service Unavailable"
        );
        if(!empty($message)) {
            $response['message'] = $message;
        }

        return $response;
    }
}
