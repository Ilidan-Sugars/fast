<?php

namespace App\Repositories;

use App\Models\Service;

class ServiceRepository
{
    public function create(array $data): Service
    {
        return Service::create($data);
    }
}
