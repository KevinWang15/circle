<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\AlbumPhoto
 *
 * @property int $id
 * @property int $user_id
 * @property int $group_id
 * @property string $image_url
 * @property string $thumbnail_image_url
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Query\Builder|\App\AlbumPhoto whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\AlbumPhoto whereGroupId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\AlbumPhoto whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\AlbumPhoto whereImageUrl($value)
 * @method static \Illuminate\Database\Query\Builder|\App\AlbumPhoto whereThumbnailImageUrl($value)
 * @method static \Illuminate\Database\Query\Builder|\App\AlbumPhoto whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\AlbumPhoto whereUserId($value)
 * @mixin \Eloquent
 */
class AlbumPhoto extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
