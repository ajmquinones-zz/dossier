<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class CreateDocumentsTable.
 */
class CreateDocumentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('documents', function (Blueprint $table) {
            $table->increments('id');
            $table->string('storage_uid', 200)
                ->nullable();
            $table->string('title', 50)
                ->nullable();
            $table->string('document_type', 50)
                ->nullable();
            $table->unsignedBigInteger('file_size')
                ->nullable();
            $table->text('public_path')
                ->nullable();
            // $table->string('file_name', 200)
            //     ->nullable();
            // $table->string('hash', 100)
            //     ->nullable();
            // $table->string('encrypted_hash', 100)
            //     ->nullable();

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
        Schema::drop('documents');
    }
}