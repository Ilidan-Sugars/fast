<?php

namespace App\Repositories;

use App\Models\Vacancy;

class VacancyRepository
{
    public function create(array $data): Vacancy
    {
        return Vacancy::create($data);
    }
}
