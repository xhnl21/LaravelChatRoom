<?php

use Illuminate\Support\Facades\Route;
use Illuminate\http\Request;
use App\Http\Controllers\ModelChatController;

Route::get('/', function () {
    dump("demo");
    return view('welcome');
});

Route::get('/demo', function () {
   return view('welcome');
});

Route::get('/chatDetails', [ModelChatController::class, 'show']);
