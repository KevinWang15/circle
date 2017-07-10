<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDocsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('docs', function (Blueprint $table) {
            $table->increments('id');
            $table->text('name');
            $table->text('link')->nullable();
            $table->longText('tags_json')->nullable();
            $table->longText('description')->nullable();
            $table->text('type')->nullable();
            $table->integer('uploaded_by_user')->nullable();
            $table->integer("size_kb")->nullable()->default(0);
            $table->text('doc_name')->nullable();
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
        Schema::dropIfExists('docs');
    }
}
