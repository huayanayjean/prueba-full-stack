<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdministradorController;
use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EstudianteCursosController;

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('administradores', AdministradorController::class);

    Route::apiResource('estudiantes', EstudianteController::class);

    Route::apiResource('cursos', CursoController::class);

    Route::post('/estudiantes/{id}/asignar-cursos', [EstudianteCursosController::class, 'asignarCursos']);

    Route::get('/reporte/top-cursos', [EstudianteCursosController::class, 'topCursos']);
    Route::get('/reporte/top-estudiantes', [EstudianteCursosController::class, 'topEstudiantes']);
    Route::get('/reporte/total-cursos', [EstudianteCursosController::class, 'totalCursos']);
    Route::get('/reporte/total-estudiantes', [EstudianteCursosController::class, 'totalEstudiantes']);
    Route::get('/reporte-estudiantes/{id}/cursos-asignados', [EstudianteCursosController::class, 'cursosAsignados']);
});
