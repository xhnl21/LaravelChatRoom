<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ModelChatController;

Route::get('/chatDetails/{id}', [ModelChatController::class, 'indexCommand']);
Route::post('/form', [ModelChatController::class, 'create']);
Route::post('/sendSMS', [ModelChatController::class, 'sendSMS']);

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');