<?php

namespace App\Api\Controllers;

use App;
use App\Group;
use App\Http\Controllers\Controller;
use App\Providers\AuthHelper;
use App\Providers\ValidationHelper;
use App\UserGroup;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use JWTAuth;

class GroupController extends Controller
{
    public function create()
    {
        $user = AuthHelper::getAuthenticatedUser();
        ValidationHelper::validate([
            'name' => 'required'
        ]);
        $group = new App\Group();
        $group->password = str_random(64);
        $group->name = Input::get('name');
        $group->save();
        $user->joinGroup($group->id);
        return [];

    }

    public function join()
    {
        $user = AuthHelper::getAuthenticatedUser();
        ValidationHelper::validate([
            'password' => 'required'
        ]);

        $group = Group::wherePassword(Input::get('password'))->first();
        if (!$group)
            err("圈子口令无效");
        if (UserGroup::whereUserId($user->id)->whereGroupId($group->id)->exists())
            err("已经在圈子中了");
        $user->joinGroup($group->id);
        return [];
    }

    public function detail()
    {
        $user = AuthHelper::getAuthenticatedUser();
        ValidationHelper::validate([
            'id' => 'required|integer'
        ]);
        $id = Input::get('id');
//        $group = App\Group::find($id);

        $kanban = App\Kanban::whereGroupId($id)->where('stage', '<', 2)->count();
        $forum = App\ForumPost::whereGroupId($id)->count();
        $album = App\AlbumPhoto::whereGroupId($id)->count();
        $doc = App\Doc::whereGroupId($id)->count();

        return compact('kanban', 'forum', 'album', 'doc');
    }

    public function members()
    {
        ValidationHelper::validate([
            'id' => 'required|integer'
        ]);
        $id = Input::get('id');
        $users = App\User::whereIn('id', App\UserGroup::whereGroupId($id)->pluck('user_id'))->get();
        return $users;
    }

    public function quit()
    {
        $user = AuthHelper::getAuthenticatedUser();
        ValidationHelper::validate([
            'id' => 'required|integer'
        ]);
        $id = Input::get('id');
        App\UserGroup::whereUserId($user->id)->whereGroupId($id)->delete();
        App\Group::postUpdateStatic($id, $user->name . '退出了圈子', 0, [], $user->id);
        $group = Group::find($id);
        $group->member_count = UserGroup::whereGroupId($group->id)->count();
        $group->save();
        return [];
    }
}