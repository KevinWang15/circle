<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\QrCommand
 *
 * @property int $id
 * @property int $user_id
 * @property string $token
 * @property string $action
 * @property string $extra
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\QrCommand whereAction($value)
 * @method static \Illuminate\Database\Query\Builder|\App\QrCommand whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\QrCommand whereExtra($value)
 * @method static \Illuminate\Database\Query\Builder|\App\QrCommand whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\QrCommand whereToken($value)
 * @method static \Illuminate\Database\Query\Builder|\App\QrCommand whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\QrCommand whereUserId($value)
 * @mixin \Eloquent
 * @property string $response
 * @method static \Illuminate\Database\Query\Builder|\App\QrCommand whereResponse($value)
 */
class QrCommand extends Model
{
    //
}
