<?php

function err($msg)
{
    response()->json(['message' => $msg], 403, ['Access-Control-Allow-Origin' => '*'])->send();
    die();
}