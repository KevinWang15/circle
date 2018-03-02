<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class QiniuProvider extends ServiceProvider
{
    public static function getUploadToken()
    {
        $auth = self::getAuth();
        $upToken = $auth->uploadToken(config("custom.QINIU_BUCKET"), null, 3600 * 24);
        return $upToken;
    }

    public static function getAuth()
    {
        $auth = new \Qiniu\Auth(config("custom.QINIU_AK"), config("custom.QINIU_SK"));
        return $auth;
    }

    public function boot()
    {
    }

    public function register()
    {
    }
}