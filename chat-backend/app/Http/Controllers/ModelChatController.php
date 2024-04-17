<?php

namespace App\Http\Controllers;

use App\Models\ModelChat;
use App\Http\Requests\StoreModelChatRequest;
use App\Http\Requests\UpdateModelChatRequest;
use App\Models\User;
use App\Events\MessageSent;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;

class ModelChatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    public function getUser($id = 0)
    {
        if ($id == 0) {
            $data = User::all();
            return $data[0];
        } else {
            $data = User::where('id', $id)->first();
            return $data;
        }       
    }

    public function indexCommand($id = 0)
    {  
        $array = [];      
        if ($id != 0) {
            $data = ModelChat::where('id', $id)->get();
        } else {
            $data = ModelChat::all();
        }
        
        foreach ($data as $key => $val) {               
            $dat = $this->getUser($val->user_id);
            $val->fromName = $dat->name;
            $array[$key]["id"] = $val->id;
            $array[$key]["user_id"] = $val->user_id;
            $array[$key]["fromName"] = $val->fromName;
            $array[$key]["subject"] = $val->subject;
            $array[$key]["date"] = $val->date;
            $array[$key]["message"] = $val->message;
            $array[$key]["created_at"] = $val->created_at;
            $array[$key]["updated_at"] = $val->updated_at;
        }
        return response()->json([
            'status' => true,
            'data' => $array
        ], 200);
    }

    public function indexRoom($id = 0)
    {  
        $array = [];      
        if ($id != 0) {
            $data = ModelChat::where('user_id', $id)->get();
        } else {
            $data = ModelChat::all();
        }
        
        foreach ($data as $key => $val) {               
            $dat = $this->getUser($val->user_id);
            $val->fromName = $dat->name;
            $array[$key]["id"] = $val->id;
            $array[$key]["user_id"] = $val->user_id;
            $array[$key]["fromName"] = $val->fromName;
            $array[$key]["subject"] = $val->subject;
            $array[$key]["date"] = $val->date;
            $array[$key]["message"] = $val->message;
            $array[$key]["created_at"] = $val->created_at;
            $array[$key]["updated_at"] = $val->updated_at;
        }
        return response()->json([
            'status' => true,
            'data' => $array
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        // dd($request->all());
        $send = [
            'name' => $request->name,
            'email' => $request->email, 
        ];
        // dd($send);
        $data = User::where('email', $request->email)->get();
        if (count($data) == 0) {
            $password = random_int(1, 100);
            $data = [
                'name' => $request->name,
                'email' => $request->email, 
                'password' => $password,
            ];
            $user = User::create($data);
            $id = $user->id; 
        } else {
            $id = $data[0]->id;
        }
        $send['user_id'] = $id;
        $send['name'] = $data[0]->name;
        return response()->json([
            'status' => true,
            'data' => $send
        ], 200);
    }

    public function createCommand($modelChat)
    {
        $data = User::where('id', $modelChat['user_id'])->get();
        if (count($data) == 0) {
            $password = random_int(1, 100);
            $ramdom = random_int(1, 9999);
            $name = 'amongus'.$ramdom;
            $email = 'amongus'.$ramdom.'@gmail.com';
            $dat = [
                'name' => $name,
                'email' => $email, 
                'password' => $password,
            ];
            $user = User::create($dat);
            $id = $user->id; 
        } else {
            $id = $data[0]->id;
        }
        $this->createChatsCommand($modelChat);
        return $id;
    }
    public function createChatsCommand($data)
    {
       $lastId = ModelChat::create($data);
       return $lastId->id;
    }

    public function sendSMS(Request $request)
    {
        date_default_timezone_set('America/Caracas');
        $date = Carbon::now()->format('g:i A');
        $send = [
            'user_id' => $request->user_id,
            'subject' => $request->subject, 
            'date' => $date,
            'message' => $request->message, 
        ];

        $dat = ModelChat::create($send);

        $send['id'] = $dat->id;
        $send['fromName'] = $request->fromName;
        MessageSent::dispatch($send);
        
        return response()->json([
            'status' => true,
            'data' => $send
        ], 200);
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
