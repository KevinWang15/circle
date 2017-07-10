<?php
/**
 * Created by PhpStorm.
 * User: Kevin
 * Date: 4/23/2017
 * Time: 9:05 PM
 */

namespace App\Api\Controllers;


use App\Http\Controllers\Controller;
use App\Providers\AuthHelper;
use App\Providers\QiniuProvider;
use Illuminate\Support\Facades\Input;

class MiscController extends Controller
{

    public static function uploadToken()
    {
        AuthHelper::getAuthenticatedUser();
        return ['token' => QiniuProvider::getUploadToken()];
    }

}