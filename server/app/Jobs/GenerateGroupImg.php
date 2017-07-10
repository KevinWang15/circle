<?php

namespace App\Jobs;

use App\Group;
use App\GroupGroup;
use App\Providers\QiniuProvider;
use App\User;
use App\UserGroup;
use App\UserGroupGroup;
use App\WeixinUser;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use PHPImageWorkshop\ImageWorkshop;
use Qiniu\Storage\UploadManager;

class GenerateGroupImg implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    /**
     * @var
     */
    public $group_id;

    /**
     * Create a new job instance.
     *
     * @param $group_id
     */
    public function __construct($group_id)
    {
        //
        $this->group_id = $group_id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {

        /** @var Group $group */
        $group = Group::whereId($this->group_id)->first();
        if (!$group || $group->member_count == 0)
            return;
        $margin = 5;
        $avatarSize = 60;
        $picSize = 4 * $margin + 3 * $avatarSize;

        $user_ids = UserGroup::whereGroupId($this->group_id)->pluck("user_id");
        $headimgurls = User::whereIn('id', $user_ids)->orderBy('id', 'asc')->pluck('avatar_url');
        if (count($headimgurls) == 0)
            return;

        $rootLayer = ImageWorkshop::initVirginLayer($picSize, $picSize);

        for ($i = 0; $i < count($headimgurls); $i++) {
            $imgurl = $headimgurls[$i];
            if (starts_with($imgurl, 'assets/')) {
                $imgurl = resource_path($imgurl);
            }
            $layer = ImageWorkshop::initFromPath($imgurl);
            $layer->resizeInPixel($avatarSize, $avatarSize, true);
            $rootLayer->addLayerOnTop($layer, $margin + ($i % 3) * ($avatarSize + $margin), $margin + intval($i / 3) * ($avatarSize + $margin));
        }

        $fname = str_random(32) . ".png";
        $rootLayer->save(storage_path(), $fname, false, null, 70);
        $uploadMgr = new UploadManager();
        list($ret, $err) = $uploadMgr->putFile(QiniuProvider::getUploadToken(), null, storage_path($fname));
        unlink(storage_path($fname));
        if ($err != null) {
            return;
        }
        $headimgurl = "http://psfiles.panopath.com/" . $ret['hash'];
        $group->image_url = $headimgurl;
        $group->save();
    }
}
