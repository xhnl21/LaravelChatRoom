<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ModelChatController;

Route::get('/user', function () {
    return dd('demo');
})->middleware('auth:sanctum');

Route::get('/users', function () {
    return dd('demo');
});

Route::get('/chatDetails/{id}', [ModelChatController::class, 'indexCommand']);
Route::post('/form', [ModelChatController::class, 'create']);
Route::post('/sendSMS', [ModelChatController::class, 'sendSMS']);