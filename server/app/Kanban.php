<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Kanban
 *
 * @property int $id
 * @property int $stage
 * @property string $title
 * @property string $next_stage_deadline
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Kanban whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Kanban whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Kanban whereNextStageDeadline($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Kanban whereStage($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Kanban whereTitle($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Kanban whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property int $group_id
 * @method static \Illuminate\Database\Query\Builder|\App\Kanban whereGroupId($value)
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\KanbanSubTask[] $subtasks
 */
class Kanban extends Model
{
    public function subtasks()
    {
        return $this->hasMany(KanbanSubTask::class);
    }
}
