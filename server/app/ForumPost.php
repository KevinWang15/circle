<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\ForumPost
 *
 * @property int $id
 * @property string $title
 * @property string $content
 * @property int $reply_count
 * @property int $group_id
 * @property int $owner_user_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\ForumPost whereContent($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ForumPost whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ForumPost whereGroupId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ForumPost whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ForumPost whereOwnerUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ForumPost whereReplyCount($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ForumPost whereTitle($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ForumPost whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[] $mentioned_users
 * @property-read \App\User $owner
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\ForumPostReply[] $replies
 */
class ForumPost extends Model
{
    public function mentioned_users()
    {
        return $this->morphToMany(User::class, 'forum_post_mentions', null, 'mentionable_id', 'mentioned_user_id');
    }

    public function replies()
    {
        return $this->hasMany(ForumPostReply::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class, "owner_user_id");
    }
}
