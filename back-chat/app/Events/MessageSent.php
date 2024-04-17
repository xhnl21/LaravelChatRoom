<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class MessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private $data;
    /**
     * Create a new event instance.
     */
    public function __construct(public array $dat)
    // public function __construct(public $dat)
    {
        Log::info(["MessageSent->linea::25", (object)$dat]);
        // dump($data);
        // dd($data);
        $this->data = (object)$dat;
        // return $data;
        // return 'demo';
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn(): Channel
    {
        Log::info(["MessageSent->linea::40", new Channel('messages')]);
        return new Channel('messages');
        // return [
        //     new Channel('messages'),
        // ];
        // return ['messages'];
    }

    public function broadcastWith(){
        Log::info(["MessageSent->linea::49", $this->data]);
        return $this->data;
    }

    /**
     * The event's broadcast name.
     */
    public function broadcastAs(): string
    {
        return 'messages';
    }
}
