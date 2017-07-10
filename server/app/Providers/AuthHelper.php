<?php

namespace App\Providers;

use App\Admin;
use App\User;
use App\WeixinUser;
use Request;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;

class AuthHelper
{
    /**
     * @return User
     */
    public static function getAuthenticatedUser()
    {
        try {
            $user = JWTAuth::toUser(JWTAuth::getToken());
        } catch (JWTException $exception) {
            response()->json(['error' => 'invalid_token'], 401, ['Access-Control-Allow-Origin' => '*'])->send();
            die();
        } catch (\Exception $exception) {
            response()->json(['message' => $exception->getMessage()], 401, ['Access-Control-Allow-Origin' => '*'])->send();
            die();
        }
        return $user;
    }
}