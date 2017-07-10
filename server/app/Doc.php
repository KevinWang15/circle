<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Doc
 *
 * @property int $id
 * @property string $name
 * @property string $link
 * @property string $tags_json
 * @property string $description
 * @property string $type
 * @property int $uploaded_by_user
 * @property int $size_kb
 * @property string $doc_name
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Doc whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Doc whereDescription($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Doc whereDocName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Doc whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Doc whereLink($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Doc whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Doc whereSizeKb($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Doc whereTagsJson($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Doc whereType($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Doc whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Doc whereUploadedByUser($value)
 * @mixin \Eloquent
 * @property int $group_id
 * @method static \Illuminate\Database\Query\Builder|\App\Doc whereGroupId($value)
 */
class Doc extends Model
{
    //
}
