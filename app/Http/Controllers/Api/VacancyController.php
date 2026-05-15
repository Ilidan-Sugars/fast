<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\VacancyStoreRequest;
use App\Repositories\VacancyRepository;
use Illuminate\Http\JsonResponse;

class VacancyController extends Controller
{
    public function store(VacancyStoreRequest $request, VacancyRepository $repository): JsonResponse
    {
        $vacancy = $repository->create($request->validated());

        return response()->json([
            'message' => 'Вакансия успешно создана',
            'vacancy' => $vacancy,
        ]);
    }
}
