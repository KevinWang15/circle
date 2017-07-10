<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUpdatesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('updates', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('group_id');

            // 0：琐碎，1：相关，2：紧急
            $table->integer('level')->default(0);

            // target_user_id=0 意味着组内所有的成员都可以见到
            $table->integer('target_user_id')->default(0);

            // 触发者id
            $table->integer('trigger_user_id')->nullable();

            // 内容
            $table->text('text');

            // 点击跳转等
            $table->longText('action_json')->nullable();
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
        Schema::dropIfExists('updates');
    }
}
