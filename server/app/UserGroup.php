<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\UserGroup
 *
 * @property int $id
 * @property int $user_id
 * @property int $group_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\UserGroup whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\UserGroup whereGroupId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\UserGroup whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\UserGroup whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\UserGroup whereUserId($value)
 * @mixin \Eloquent
 */
class UserGroup extends Model
{
    //
}
