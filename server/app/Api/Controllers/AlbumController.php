<?php

namespace App\Api\Controllers;

use App;
use App\Http\Controllers\Controller;
use App\Kanban;
use App\KanbanSubTask;
use App\Providers\AuthHelper;
use App\Providers\ValidationHelper;
use App\UserAssignKanbanSubTask;
use Carbon\Carbon;
use Dingo\Blueprint\Annotation\Method\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Illuminate\Validation\Rules\In;
use JWTAuth;

class AlbumController extends Controller
{
    public function ls()
    {
        $user = AuthHelper::getAuthenticatedUser();
        ValidationHelper::validate([
            'group_id' => 'required|integer'
        ]);

        $group_id = Input::get('group_id');

        $list = App\AlbumPhoto::with('user')
            ->whereGroupId($group_id)
            ->orderBy('id', 'desc')
            ->get();

        return $list;
    }

    public function del()
    {
        $user = AuthHelper::getAuthenticatedUser();
        ValidationHelper::validate([
            'id' => 'required|integer'
        ]);

        $album = App\AlbumPhoto::find(Input::get('id'));
        $album->delete();
        return [];
    }

    public function create()
    {
        $user = AuthHelper::getAuthenticatedUser();
        ValidationHelper::validate([
            'group_id' => 'required|integer',
            'image_urls' => 'required'
        ]);

        $image_urls = Input::get('image_urls');
        foreach ($image_urls as $image_url) {
            $album = new App\AlbumPhoto();
            $album->image_url = $image_url;
            $album->thumbnail_image_url = $image_url . '?imageMogr2/thumbnail/50000@';
            $album->group_id = Input::get('group_id');
            $album->user_id = $user->id;
            $album->save();
        }
        App\Group::postUpdateStatic($album->group_id, $user->name . '上传了' . count($image_urls) . '张照片', 0, ['navigate' => 'album'], $user->id);
        return [];
    }
}