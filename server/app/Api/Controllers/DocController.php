<?php

namespace App\Api\Controllers;

use App;
use App\Helpers\TransactionHelper;
use App\Http\Controllers\Controller;
use App\Providers\AuthHelper;
use App\Providers\ValidationHelper;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use JWTAuth;

class DocController extends Controller
{
    public function detail()
    {
        $user = AuthHelper::getAuthenticatedUser();
        ValidationHelper::validate([
            'id' => 'required|integer'
        ]);
        $id = Input::get('id');
        $doc = App\Doc::find($id);
        return $doc;
    }

    public function ls()
    {
        $user = AuthHelper::getAuthenticatedUser();
        ValidationHelper::validate([
            'start' => 'required|integer',
            'group_id' => 'required|integer',
        ]);

        $start = Input::get('start');
        $filter = Input::get('filter', []);

        $query = App\Doc::whereGroupId(Input::get('group_id'));
        foreach ($filter as $f) {
            $f = trim(strtolower($f));
            if (strlen($f) > 0)
                $query = $query->whereRaw('instr(lower(tags_json),?)>0', [$f]);
        }

        $list = $query->orderBy("id", 'desc')->skip($start)->take(10)->get(['doc_name', 'id', 'size_kb', 'created_at', 'type', 'name']);
        return compact('list');
    }

    public function create()
    {
        $user = AuthHelper::getAuthenticatedUser();
        ValidationHelper::validate([
            'group_id' => 'required|integer',
            'size_kb' => 'required|integer',
            'file_url' => 'required',
            'name' => 'required'
        ]);

        $tags = Input::get('tags');
        $doc = new App\Doc();
        $doc->tags_json = json_encode($tags, JSON_UNESCAPED_UNICODE);
        $doc->name = Input::get('name');
        $doc->doc_name = Input::get('name');
        $doc->link = Input::get('file_url');
        $doc->uploaded_by_user = $user->id;
        $doc->group_id = Input::get('group_id');
        $doc->size_kb = Input::get('size_kb');
        App\Group::postUpdateStatic($doc->group_id, $user->name . '上传了文件' . $doc->name, 0, [], $user->id);
        $doc->save();
        return [];
    }
}