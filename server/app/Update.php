<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Update
 *
 * @property int $id
 * @property int $group_id
 * @property int $level
 * @property int $target_user_id
 * @property int $trigger_user_id
 * @property string $text
 * @property string $action_json
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Update whereActionJson($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Update whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Update whereGroupId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Update whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Update whereLevel($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Update whereTargetUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Update whereText($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Update whereTriggerUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Update whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \App\User $trigger_user
 */
class Update extends Model
{
    public function trigger_user()
    {
        return $this->belongsTo(\App\User::class, 'trigger_user_id');
    }
}
