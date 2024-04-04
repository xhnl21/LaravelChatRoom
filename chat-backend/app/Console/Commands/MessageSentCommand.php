<?php

namespace App\Console\Commands;

use Illuminate\Support\Carbon;
use Illuminate\Console\Command;
use function Laravel\Prompts\text;
use App\Events\MessageSent;
class MessageSentCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:message';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command send message to chat';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $id = random_int(1, 100);
        $fromName = "Xavier";
        $subject = "Solo Leveling";
        $date = Carbon::now()->format('g:i A');
        $message = text(
            label:'What is your message?',
            required: true
        );
        $data = [
            'id' => $id, 
            'fromName' => $fromName, 
            'subject' => $subject, 
            'date' => $date, 
            'message' => $message
        ];
        // dd($data);
        MessageSent::dispatch($data);
    }
}
