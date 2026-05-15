<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceStoreRequest;
use App\Repositories\ServiceRepository;
use Illuminate\Http\JsonResponse;

class ServiceController extends Controller
{
    public function store(ServiceStoreRequest $request, ServiceRepository $repository): JsonResponse
    {
        $service = $repository->create($request->validated());

        return response()->json([
            'message' => 'Услуга успешно создана',
            'service' => $service,
        ]);
    }
}
