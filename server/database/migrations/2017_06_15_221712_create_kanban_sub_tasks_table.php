<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateKanbanSubTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kanban_sub_tasks', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('kanban_id');

            // 子任务所属的阶段
            $table->integer('kanban_stage');
            $table->text('title')->default('');
            $table->boolean('finished')->default(false);
            $table->dateTime('deadline');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kanban_sub_tasks');
    }
}
