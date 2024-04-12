<?php

use Illuminate\Support\Facades\Route;
use Illuminate\http\Request;
use App\Http\Controllers\ModelChatController;

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/index', [ModelChatController::class, 'indexCommand']);
Route::group(['middleware' => ['cors']], function () {
    //Rutas a las que se permitirá acceso
    Route::get('/index', [ModelChatController::class, 'indexCommand']);
});

















