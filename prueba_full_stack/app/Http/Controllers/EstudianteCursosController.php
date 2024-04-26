<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Estudiante;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class EstudianteCursosController extends Controller
{
    public function asignarCursos(Request $request, $estudianteId)
    {
        $estudiante = Estudiante::findOrFail($estudianteId);
        $cursoIds = $request->curso_ids;
        $fechaAsignacion = Carbon::now()->toDateTimeString();
        //$estudiante->cursos()->sync($cursoIds);
        foreach ($cursoIds as $cursoId) {
            $estudiante->cursos()->attach($cursoId, ['fecha_asignacion' => $fechaAsignacion]);
        }
        return response()->json(['message' => 'Cursos asignados correctamente'], 200);
    }

    public function topCursos()
    {
        $cursos = DB::table('estudiante_curso')
            ->join('cursos', 'estudiante_curso.curso_id', '=', 'cursos.id')
            ->select('estudiante_curso.curso_id', 'cursos.nombre', DB::raw('COUNT(estudiante_curso.estudiante_id) as total_estudiantes'))
            ->where('estudiante_curso.fecha_asignacion', '>=', now()->subMonths(6))
            ->groupBy('estudiante_curso.curso_id', 'cursos.nombre')
            ->orderByDesc('total_estudiantes')
            ->limit(3)
            ->get();

        return response()->json($cursos, 200);
    }

    public function topEstudiantes()
    {
        $estudiantes = DB::table('estudiante_curso')
            ->select('estudiantes.nombre', 'estudiante_curso.estudiante_id', DB::raw('COUNT(estudiante_curso.curso_id) as total_cursos'))
            ->join('estudiantes', 'estudiantes.id', '=', 'estudiante_curso.estudiante_id')
            ->groupBy('estudiante_curso.estudiante_id')
            ->orderByDesc('total_cursos')
            ->limit(3)
            ->get();

        return response()->json($estudiantes, 200);
    }

    public function totalCursos()
    {
        $totalCursos = Curso::count();
        return response()->json(['total_cursos' => $totalCursos], 200);
    }

    public function totalEstudiantes()
    {
        $totalEstudiantes = Estudiante::count();
        return response()->json(['total_estudiantes' => $totalEstudiantes], 200);
    }

    public function cursosAsignados($estudianteId)
    {
        $cursosAsignados = Estudiante::findOrFail($estudianteId)->cursos;
        return response()->json($cursosAsignados, 200);
    }
}
