<?php

namespace App\Api\Controllers;

use App\Providers\AuthHelper;
use App\QrCommand;
use Illuminate\Support\Facades\Input;

class QrController
{
    public function getToken()
    {
        $token = str_random(32);
        $qr = new QrCommand();
        $qr->token = $token;
        $qr->extra = "";
        $qr->action = "";
        $qr->save();
        return ['token' => $qr->token];
    }

    public function setAction()
    {
        $token = Input::get('token');
        /** @var QrCommand $qr */
        $qr = QrCommand::whereToken($token)->first();
        if (!$qr)
            err("无效的token");
        $qr->action = Input::get('action');
        $qr->save();
        return [];
    }

    public function getResponse()
    {
        $token = Input::get('token');
        /** @var QrCommand $qr */
        $qr = QrCommand::whereToken($token)->first();
        if (!$qr)
            err("无效的token");
        return ['response' => $qr->response];
    }

    public function setResponse()
    {
        $token = Input::get('token');
        /** @var QrCommand $qr */
        $qr = QrCommand::whereToken($token)->first();
        if (!$qr)
            err("无效的token");
        $qr->response = Input::get('response');
        $qr->save();
        return [];
    }

    public function query()
    {
        set_time_limit(5);
        $token = Input::get('token');
        /** @var QrCommand $qr */
        $qr = QrCommand::whereToken($token)->first();
        if (!$qr)
            err("无效的token");

        while (true) {
            $qr = QrCommand::whereToken($token)->first();
            if ($qr->action)
                return ["action" => $qr->action];
            else
                sleep(1);
        }

        return null;
    }
}