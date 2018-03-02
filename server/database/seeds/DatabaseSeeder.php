<?php

use App\Location;
use App\Report;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, 200)->create()->each(function ($u) {
        });
        factory(App\Group::class, 10)->create()->each(function ($u) {
        });
        $groups = \App\Group::all();
        foreach ($groups as $group) {
            $cnt = rand(5, 15);
            for ($i = 0; $i < $cnt; $i++) {
                $user = \App\User::orderBy(\DB::raw('RAND()'))->first();
                $ug = new \App\UserGroup();
                $ug->user_id = $user->id;
                $ug->group_id = $group->id;
                $ug->save();
            }
            $group->member_count = $cnt;
            $group->save();
            dispatch(new \App\Jobs\GenerateGroupImg($group->id));
        }
    }
}
