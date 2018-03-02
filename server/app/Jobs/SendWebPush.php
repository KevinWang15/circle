<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class SendWebPush implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    /**
     * @var
     */
    private $content;

    /**
     * Create a new job instance.
     *
     * @param $content
     */
    public function __construct($content)
    {
        //
        $this->content = $content;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        function sendMessage($text)
        {
            $headings = array(
                "en" => '有新的工单等待处理'
            );

            $content = array(
                "en" => $text
            );

            $fields = array(
                'app_id' => "b78f397a-2f00-49f0-991b-7423552d9764",
                'included_segments' => array('All'),
                'data' => array("foo" => "bar"),
                'headings' => $headings,
                'contents' => $content,
                'url' => 'http://society-admin.panopath.com/',
                'web_buttons' => [["id" => "view-button", "text" => "打开后台查看", 'url' => 'http://society-admin.panopath.com/']]
            );

            $fields = json_encode($fields);
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json; charset=utf-8',
                'Authorization: Basic MWQ1NmU1ODEtZjYyMC00ZGEzLWI4MGYtNDJmMmU4NmJlZWFi'));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
            curl_setopt($ch, CURLOPT_HEADER, FALSE);
            curl_setopt($ch, CURLOPT_POST, TRUE);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

            $response = curl_exec($ch);
            curl_close($ch);

            return $response;
        }

        sendMessage($this->content);
    }
}
