<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')
    ->prefix('v1')
    ->namespace('Api\V1')
    ->group(function() {
        Route::get('/test', 'DocumentsController@test');
        Route::get('/documents', 'DocumentsController@list')
            ->middleware('scope:list-documents');
        Route::post('/document', 'DocumentsController@upload')
            ->middleware('scope:create-document');
        Route::delete('/document/{uid}', 'DocumentsController@delete')
            ->middleware('scope:delete-document');
    });
