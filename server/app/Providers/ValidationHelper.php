<?php
/**
 * Created by PhpStorm.
 * User: Kevin
 * Date: 4/20/2017
 * Time: 6:10 PM
 */

namespace App\Providers;


use Illuminate\Support\Facades\Input;
use Validator;

class ValidationHelper
{
    public static function validate($rules)
    {
        $validator = Validator::make(Input::all(), $rules);
        if ($validator->fails()) {
            response()->json([
                'error' => 'invalid_data',
                'message' => join("\n", $validator->errors()->all())
            ], 401, ['Access-Control-Allow-Origin' => '*'])->send();
            die();
        }
    }
}