<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use Illuminate\Http\Request;

class CursoController extends Controller
{
    public function index()
    {
        $curso = Curso::all();
        return response()->json($curso);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string',
        ]);

        $curso = Curso::create($request->all());

        return response()->json($curso, 201);
    }

    public function show(string $id)
    {
        $curso = Curso::findOrFail($id);
        return response()->json($curso);
    }

  
    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'nombre' => 'required|string',
            'horario' => 'required|string',
        ]);

        $curso = Curso::findOrFail($id);
        $curso->update($request->all());

        return response()->json($curso);
    }

    public function destroy(string $id)
    {
        $curso = Curso::findOrFail($id);
        $curso->delete();

        return response()->json(null, 204);
    }
}
