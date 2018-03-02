<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\KanbanSubTask
 *
 * @property int $id
 * @property int $kanban_id
 * @property int $kanban_stage
 * @property string $title
 * @property bool $finished
 * @property string $deadline
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\KanbanSubTask whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\KanbanSubTask whereDeadline($value)
 * @method static \Illuminate\Database\Query\Builder|\App\KanbanSubTask whereFinished($value)
 * @method static \Illuminate\Database\Query\Builder|\App\KanbanSubTask whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\KanbanSubTask whereKanbanId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\KanbanSubTask whereKanbanStage($value)
 * @method static \Illuminate\Database\Query\Builder|\App\KanbanSubTask whereTitle($value)
 * @method static \Illuminate\Database\Query\Builder|\App\KanbanSubTask whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[] $assigned_to
 */
class KanbanSubTask extends Model
{
    public function assigned_to()
    {
        return $this->belongsToMany(
            User::class,
            'user_assign_kanban_sub_tasks'
        );
    }
}
