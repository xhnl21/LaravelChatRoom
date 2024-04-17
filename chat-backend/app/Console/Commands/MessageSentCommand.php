<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use function Laravel\Prompts\text;
use App\Events\MessageSent;
use App\Http\Controllers\ModelChatController as MCC;

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
        $r = new MCC();
        $dat = $r->getUser();

        $id = random_int(1, 100);
        $fromName = "Xavier";
        $subject = "Solo Leveling";
        date_default_timezone_set('America/Caracas');
        $date = Carbon::now()->format('g:i A');
        $message = text(
            label:'What is your message?',
            required: true
        );
        $data = [
            'user_id' => $dat->id,
            'fromName' => $fromName,
            'subject' => $subject, 
            'date' => $date, 
            'message' => $message
        ];
        
        $o = $r->createCommand($data);
        $data['id'] = $o;
        $data['fromName'] = $dat->name;
        MessageSent::dispatch($data);
    }
}
