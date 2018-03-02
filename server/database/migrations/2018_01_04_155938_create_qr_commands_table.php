<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateQrCommandsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('qr_commands', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("user_id")->nullable()->default(0);
            $table->string("token")->nullable()->default("");
            $table->longText("action")->nullable();
            $table->longText("extra")->nullable();
            $table->longText('response')->nullable();
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
        Schema::dropIfExists('qr_commands');
    }
}
