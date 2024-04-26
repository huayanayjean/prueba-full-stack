import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { EstudiantesComponent } from './components/estudiantes/estudiantes.component';
import { AsignarCursoEstudianteComponent } from './components/asignar-curso-estudiante/asignar-curso-estudiante.component';
import { NuevoEstudianteComponent } from './components/estudiantes/nuevo-estudiante/nuevo-estudiante.component';
import { MntoCursosComponent } from './components/cursos/mnto-cursos/mnto-cursos.component';

export const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "dashboard",
        component: DashboardComponent
    },
    {
        path: "curso",
        component: CursosComponent
    },
    {
        path: "estudiante",
        component: EstudiantesComponent
    },
    {
        path: "curso-estudiante",
        component: AsignarCursoEstudianteComponent
    },
    {
        path: "estudiante-nuevo",
        component: NuevoEstudianteComponent
    },
    {
        path: "estudiante-nuevo/:id",
        component: NuevoEstudianteComponent
    },
    {
        path: "curso-nuevo",
        component: MntoCursosComponent
    },
    {
        path: "curso-nuevo/:id",
        component: MntoCursosComponent
    }
];
