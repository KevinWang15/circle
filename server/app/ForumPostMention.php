<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\ForumPostMention
 *
 * @property int $id
 * @property int $mentionable_id
 * @property int $mentioned_user_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\ForumPostMention whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ForumPostMention whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ForumPostMention whereMentionableId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ForumPostMention whereMentionedUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\ForumPostMention whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property string $forum_post_mentions_type
 * @method static \Illuminate\Database\Query\Builder|\App\ForumPostMention whereForumPostMentionsType($value)
 */
class ForumPostMention extends Model
{
}
