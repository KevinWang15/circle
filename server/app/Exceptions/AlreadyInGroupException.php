<?php

namespace App\Exceptions;


use App\GroupEntity;

class AlreadyInGroupException extends \Exception
{
    /**
     * @var GroupEntity
     */
    public $entity;

}