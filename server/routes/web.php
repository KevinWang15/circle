<?php

/** @var \Dingo\Api\Routing\Router $api */
use Illuminate\Support\Str;

$api = app(Dingo\Api\Routing\Router::class);

/**
 * Important:
 *  Run ``` php artisan api:cache ``` to clear the route cache when routes have been modified!
 */
$api->version('v1',
    function ($api) {
//        $api->get('test', function () {
//            $groups = \App\Group::all();
//            foreach ($groups as $group) {
//                $group->password = str_random(64);
//                $group->save();
//            }
//        });
        $api->group(['prefix' => 'user'], function ($api) {
            $api->post('register', 'App\Api\Controllers\UserController@register');
            $api->post('login', 'App\Api\Controllers\UserController@login');
            $api->post('info', 'App\Api\Controllers\UserController@info');
            $api->post('my-updates', 'App\Api\Controllers\UserController@myUpdates');
            $api->post('my-groups', 'App\Api\Controllers\UserController@myGroups');
            $api->post('edit-profile', 'App\Api\Controllers\UserController@editProfile');
        });
        $api->group(['prefix' => 'kanban'], function ($api) {
            $api->post('ls', 'App\Api\Controllers\KanbanController@ls');
            $api->post('create', 'App\Api\Controllers\KanbanController@create');
            $api->post('create-subtask', 'App\Api\Controllers\KanbanController@createSubTask');
            $api->post('set-subtask-finished', 'App\Api\Controllers\KanbanController@setSubTaskFinished');
            $api->post('next-stage', 'App\Api\Controllers\KanbanController@nextStage');
        });
        $api->group(['prefix' => 'forum'], function ($api) {
            $api->post('ls', 'App\Api\Controllers\ForumController@ls');
            $api->post('create', 'App\Api\Controllers\ForumController@create');
            $api->post('reply', 'App\Api\Controllers\ForumController@reply');
            $api->post('get', 'App\Api\Controllers\ForumController@get');
        });
        $api->group(['prefix' => 'group'], function ($api) {
            $api->post('create', 'App\Api\Controllers\GroupController@create');
            $api->post('detail', 'App\Api\Controllers\GroupController@detail');
            $api->post('join', 'App\Api\Controllers\GroupController@join');
            $api->post('update-detail', 'App\Api\Controllers\GroupController@updateDetail');
            $api->post('members', 'App\Api\Controllers\GroupController@members');
            $api->post('quit', 'App\Api\Controllers\GroupController@quit');
        });
        $api->group(['prefix' => 'album'], function ($api) {
            $api->post('ls', 'App\Api\Controllers\AlbumController@ls');
            $api->post('create', 'App\Api\Controllers\AlbumController@create');
        });
        $api->group(['prefix' => 'doc'], function ($api) {
            $api->post('ls', 'App\Api\Controllers\DocController@ls');
            $api->post('detail', 'App\Api\Controllers\DocController@detail');
        });
        $api->group(['prefix' => 'misc'], function ($api) {
            $api->post('upload-token', 'App\Api\Controllers\MiscController@uploadToken');
        });
    });