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

class ForumController extends Controller
{
    public function ls()
    {
        $user = AuthHelper::getAuthenticatedUser();
        ValidationHelper::validate([
            'group_id' => 'required|integer',
            'start' => 'required|integer'
        ]);

        $group_id = Input::get('group_id');

        $list = App\ForumPost::with('owner')
            ->whereGroupId($group_id)
//            ->leftJoin('users', 'users.id', '=', 'owner_user_id')
            ->skip(Input::get('start'))
            ->take(10)
            ->orderBy('id', 'desc')
            ->get();

        return $list;
    }

    public function reply()
    {
        $user = AuthHelper::getAuthenticatedUser();
        ValidationHelper::validate([
            'id' => 'required|integer',
            'content' => 'required'
        ]);
        $reply = new App\ForumPostReply();
        $reply->forum_post_id = Input::get('id');
        $reply->content = Input::get('content');
        $reply->user_id = $user->id;
        $reply->save();
        $post = App\ForumPost::find(Input::get('id'));
        $post->reply_count = App\ForumPostReply::whereForumPostId($post->id)->count();
        $post->save();
        if ($user['id'] != $post->owner_user_id)
            App\Group::postUpdateStatic($post->group_id, '你的帖子[' . $post->title . ']被回复', 1, ['navigate' => 'forum'], $user['id'], $post->owner_user_id);
        return [];
    }

    public function create()
    {
        $owner_user = AuthHelper::getAuthenticatedUser();
        ValidationHelper::validate([
            'group_id' => 'required|integer',
            'title' => 'required',
            'content' => 'required'
        ]);
        $post = new App\ForumPost();
        $post->group_id = Input::get('group_id');
        $post->title = Input::get('title');
        $post->content = Input::get('content');
        $post->owner_user_id = $owner_user->id;
        $post->save();

        $mentioned = Input::get('mentioned', []);
        foreach ($mentioned as $user) {
            $mention = new App\ForumPostMention();
            $mention->forum_post_mentions_type = App\ForumPost::class;
            $mention->mentionable_id = $post->id;
            $mention->mentioned_user_id = $user['id'];
            $mention->save();
            App\Group::postUpdateStatic($post->group_id, '你在帖子[' . $post->title . ']中被提到', 1, ['navigate' => 'kanban'], $owner_user->id, $user["id"]);
        }
        App\Group::postUpdateStatic($post->group_id, $owner_user->name . '在论坛中发表了[' . $post->title . ']', 0, ['navigate' => 'forum'], $owner_user->id);
        return $post;
    }

    public function get()
    {
        $user = AuthHelper::getAuthenticatedUser();
        ValidationHelper::validate([
            'id' => 'required|integer'
        ]);
        $post = App\ForumPost::with(['mentioned_users', 'replies.user'])->find(Input::get('id'));
        return $post;
    }
}