<?php

namespace App\Api\Controllers;

use App;
use App\Http\Controllers\Controller;
use App\Providers\AuthHelper;
use App\Providers\ValidationHelper;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use JWTAuth;

class UserController extends Controller
{
    public function info()
    {
        $user = AuthHelper::getAuthenticatedUser();
        return
            [
                'id' => $user->id,
                'name' => $user->name,
                'avatar_url' => $user->avatar_url,
                'mobile' => $user->mobile,
                'email' => $user->email,
            ];
    }

    public function myUpdates()
    {
        $user = AuthHelper::getAuthenticatedUser();
        $updates = App\Update::with('trigger_user')->whereTargetUserId($user->id)
            ->orWhereRaw('(target_user_id=0 and group_id in (select group_id from user_groups where user_id=?))', [$user->id])
            ->orderBy('created_at', 'desc')->get();
        return $updates;
    }

    public function myGroups()
    {
        $user = AuthHelper::getAuthenticatedUser();
        $query = \DB::select("
            select 
                    groups.id,
                    groups.name,
                    groups.member_count,
                    groups.image_url
            from groups
            where groups.id in 
                        (SELECT user_groups.group_id from user_groups where user_groups.user_id=?)
            order by groups.id asc
            ",
            [$user->id]);

        foreach ($query as $item) {
            $update = App\Group::getLatestUpdateStatic($item->id);
            if ($update) {
                $item->group_update_id = $update['id'];
                $item->group_update_text = $update['text'];
            }
        }
        return $query;
    }

    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);
        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }
        return response()->json(compact('token'));
    }

    public function register(Request $request)
    {
        ValidationHelper::validate([
            'email' => 'required|email',
            'password' => 'required',
            'name' => 'required'
        ]);
        $email = Input::get('email');
        $password = Input::get('password');
        $name = Input::get('name');
        if (App\User::whereEmail($email)->exists()) {
            err("Email已经被注册过了");
        }
        $user = new App\User();
        $user->email = $email;
        $user->name = $name;
        $user->password = bcrypt($password);
        $user->avatar_url = "assets/avatars/default.png";
        $user->save();
        return [];
    }

    public function editProfile(Request $request)
    {
        ValidationHelper::validate([
            'email' => 'required|email',
            'name' => 'required'
        ]);

        $user = AuthHelper::getAuthenticatedUser();
        $user->email = Input::get('email');
        $user->name = Input::get('name');
        $user->mobile = Input::get('mobile', "");
        $user->save();
        return [];
    }
}