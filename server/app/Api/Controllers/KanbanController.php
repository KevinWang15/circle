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
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use JWTAuth;

class KanbanController extends Controller
{
    public function detail()
    {
        $user = AuthHelper::getAuthenticatedUser();
        ValidationHelper::validate([
            'id' => 'required|integer'
        ]);
        $id = Input::get('id');
        $uge = App\UserGroup::whereGroupId($id)->whereUserId($user->id)->first();
        if (!$uge) {
            err("没有权限");
        }
        $group = App\Group::find($id, ['id', 'description']);
//        $updates = App\GroupUpdate::whereGroupId($id)->orderBy("id", 'desc')->get(['type', 'id', 'title', 'created_at']);
//        $entity = App\GroupEntity::find($uge->group_entity_id, ['qr_img']);
        return compact('group', 'updates', 'entity');
    }

    public function ls()
    {
        $user = AuthHelper::getAuthenticatedUser();
        ValidationHelper::validate([
            'group_id' => 'required|integer'
        ]);
        $group_id = Input::get('group_id');
        $list = App\Kanban::with('subtasks.assigned_to')->whereGroupId($group_id)->get();
        return $list;
//        $users = App\User::whereIn('id', App\UserGroup::whereGroupId($id)->pluck('user_id'))->get(['name', 'id', 'email', 'avatar_url']);
//        return $users;
    }

    public function create()
    {
        $user = AuthHelper::getAuthenticatedUser();
        ValidationHelper::validate([
            'group_id' => 'required|integer',
            'title' => 'required',
            'stage' => 'required|integer',
            'next_stage_deadline' => 'required'
        ]);
        $kanban = new App\Kanban();
        $kanban->group_id = Input::get('group_id');
        $kanban->title = Input::get('title');
        $kanban->stage = Input::get('stage');
        $kanban->next_stage_deadline = Input::get('next_stage_deadline');

        $kanban->save();
        App\Group::postUpdateStatic($kanban->group_id, '新的看板：' . $kanban->title, 0, ['navigate' => 'kanban'], $user->id);

        return $kanban;
//        $users = App\User::whereIn('id', App\UserGroup::whereGroupId($id)->pluck('user_id'))->get(['name', 'id', 'email', 'avatar_url']);
//        return $users;
    }

    public function createSubTask()
    {
        $_user = AuthHelper::getAuthenticatedUser();
        ValidationHelper::validate([
            'kanban_id' => 'required|integer',
            'title' => 'required',
            'deadline' => 'required'
        ]);

        $subtask = new App\KanbanSubTask();
        $subtask->kanban_id = Input::get('kanban_id');
        $subtask->title = Input::get('title');
        $subtask->deadline = Input::get('deadline');
        $subtask->save();

        $assigned_to = Input::get('assigned_to', []);
        App\Group::postUpdateStatic(Kanban::find($subtask->kanban_id)->group_id, '新的子任务：' . $subtask->title, 0, ['navigate' => 'kanban'], $_user->id);
        foreach ($assigned_to as $user) {
            $assign = new UserAssignKanbanSubTask();
            $assign->kanban_sub_task_id = $subtask->id;
            $assign->user_id = $user['id'];
            $assign->save();
            App\Group::postUpdateStatic(Kanban::find($subtask->kanban_id)->group_id, '你被分配了任务：' . $subtask->title, 2, ['navigate' => 'kanban'], $_user->id, $user['id']);
        }
        return $subtask;
    }


    public function setSubTaskFinished()
    {
        $user = AuthHelper::getAuthenticatedUser();
        ValidationHelper::validate([
            'id' => 'required|integer',
            'finished' => 'required',
        ]);

        $subtask = KanbanSubTask::find(Input::get('id'));
        $subtask->finished = Input::get('finished');
        $subtask->save();
        if ($subtask->finished) {
            App\Group::postUpdateStatic(Kanban::find($subtask->kanban_id)->group_id, $subtask->title . '任务完成', 0, ['navigate' => 'kanban'], $user->id);
        }
        return $subtask;
    }

    public function nextStage()
    {
        $user = AuthHelper::getAuthenticatedUser();
        ValidationHelper::validate([
            'id' => 'required|integer',
            'next_stage_deadline' => 'required',
        ]);

        $kanban = Kanban::find(Input::get('id'));
        if ($kanban->stage >= 2)
            return $kanban;
        $kanban->stage++;
        $kanban->next_stage_deadline = Input::get('next_stage_deadline');
        $kanban->save();
        App\Group::postUpdateStatic($kanban->group_id, $kanban->title . '进入了下一阶段', 0, ['navigate' => 'kanban'], $user->id);
        return $kanban;
    }
}