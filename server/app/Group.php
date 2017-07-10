<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Group
 *
 * @property int $id
 * @property string $name
 * @property string $image_url
 * @property string $description
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Group whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Group whereDescription($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Group whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Group whereImageUrl($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Group whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Group whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property int $member_count
 * @method static \Illuminate\Database\Query\Builder|\App\Group whereMemberCount($value)
 * @property string $password
 * @method static \Illuminate\Database\Query\Builder|\App\Group wherePassword($value)
 */
class Group extends Model
{

    function getLatestUpdate()
    {
        return self::getLatestUpdateStatic($this->id);
    }

    static function getLatestUpdateStatic($id)
    {
//        return \Cache::sear("group-update-{$id}", function () use ($id) {
        return Update::whereGroupId($id)->whereTargetUserId(0)->orderBy('id', 'desc')->first();
//        return GroupUpdate::whereGroupId($id)->orderBy('id', 'desc')->first();
//        });
    }

    function postUpdate($text, $level = 0, $action = [], $trigger_user_id = 0, $target_user_id = 0)
    {
        return self::postUpdateStatic($this->id, $text, $level, $action, $trigger_user_id, $target_user_id);
    }

    static function postUpdateStatic($group_id, $text, $level = 0, $action = [], $trigger_user_id = 0, $target_user_id = 0)
    {
        $update = new Update();
        $update->group_id = $group_id;
        $update->text = $text;
        $update->level = $level;
        $update->action_json = json_encode($action);
        $update->trigger_user_id = $trigger_user_id;
        $update->target_user_id = $target_user_id;
        $update->save();
    }
}
