<?php

namespace App\Helpers;

class TransactionHelper
{
    public static function give(\App\WeixinUser $user, $amount, $memo, $extra)
    {
        $fresh = $user->fresh();
        $user->pp_points = $fresh->pp_points + $amount;
        if ($amount > 0)
            $user->cumulative_pp_points = $fresh->cumulative_pp_points + $amount;
        $transaction = new \App\Transaction();
        $transaction->user_id = $user->id;
        $transaction->amount = $amount;
        $transaction->memo = $memo;
        $transaction->extra = $extra;
        $transaction->save();
        $user->save();
        return;
    }

    public static function take(\App\WeixinUser $user, $amount, $memo, $extra)
    {
        if ($amount < 0)
            return;
        self::give($user, -$amount, $memo, $extra);
    }
}