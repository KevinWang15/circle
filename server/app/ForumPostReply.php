<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\ForumPostReply
 *
 * @property int $id
 * @property int $forum_post_id
 * @property int $user_id
 * @property string $content
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\ForumPostReply whereContent($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ForumPostReply whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ForumPostReply whereForumPostId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ForumPostReply whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ForumPostReply whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ForumPostReply whereUserId($value)
 * @mixin \Eloquent
 * @property-read \App\User $user
 */
class ForumPostReply extends Model
{
    public function user()
    {
        return $this
            ->belongsTo(User::class);
    }
}
