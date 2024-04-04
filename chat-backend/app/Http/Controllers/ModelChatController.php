<?php

namespace App\Http\Controllers;

use App\Models\ModelChat;
use App\Http\Requests\StoreModelChatRequest;
use App\Http\Requests\UpdateModelChatRequest;
use Illuminate\Http\Request;

class ModelChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function createCommand($modelChat)
    {
        dd($modelChat);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreModelChatRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ModelChat $modelChat)
    {
       $lastId = ModelChat::create($modelChat);
       return $lastId->id;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ModelChat $modelChat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateModelChatRequest $request, ModelChat $modelChat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ModelChat $modelChat)
    {
        //
    }
}
