<?php

namespace App;

use App;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;

/**
 * App\User
 *
 * @property int $id
 * @property string $name
 * @property string $password
 * @property string $email
 * @property string $avatar_url
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\User whereAvatarUrl($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereEmail($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User wherePassword($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property string $mobile
 * @method static \Illuminate\Database\Query\Builder|\App\User whereMobile($value)
 */
class User extends Model implements Authenticatable
{
    public $hidden = ['password', 'created_at', 'updated_at'];

    /**
     * Get the name of the unique identifier for the user.
     *
     * @return string
     */
    public function getAuthIdentifierName()
    {
        return 'email';
    }

    /**
     * Get the unique identifier for the user.
     *
     * @return mixed
     */
    public function getAuthIdentifier()
    {
        return $this->email;
    }

    /**
     * Get the password for the user.
     *
     * @return string
     */
    public function getAuthPassword()
    {
        return $this->password;
    }

    /**
     * Get the token value for the "remember me" session.
     *
     * @return string
     */
    public function getRememberToken()
    {
        App::abort(501, 'Feature not implemented');
    }

    /**
     * Set the token value for the "remember me" session.
     *
     * @param  string $value
     * @return void
     */
    public function setRememberToken($value)
    {
        App::abort(501, 'Feature not implemented');
    }

    /**
     * Get the column name for the "remember me" token.
     *
     * @return string
     */
    public function getRememberTokenName()
    {
        App::abort(501, 'Feature not implemented');
    }

    public function joinGroup($id)
    {
        $ug = new UserGroup();
        $ug->user_id = $this->id;
        $ug->group_id = $id;
        $ug->save();
        $update = new Update();
        $update->group_id = $id;
        $update->trigger_user_id = $this->id;
        $update->target_user_id = 0;
        $update->level = 0;
        $update->text = $this->name . "加入了圈子";
        $update->save();
        $group = Group::find($id);
        $group->member_count = UserGroup::whereGroupId($group->id)->count();
        $group->save();
        dispatch(new App\Jobs\GenerateGroupImg($id));
    }
}
