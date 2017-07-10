<?php

namespace App\Exceptions;


use App\Group;

class NoAvailableGroupEntityException extends \Exception
{
    /**
     * @var Group
     */
    public $group;
}