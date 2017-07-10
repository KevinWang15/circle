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

        $list = $query->skip($start)->take(10)->get(['doc_name', 'id', 'size_kb', 'created_at', 'type', 'name']);
        return compact('list');
    }
}