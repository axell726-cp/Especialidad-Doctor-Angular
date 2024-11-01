import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EspecialidadComponent } from './especialidad/especialidad.component';
import { DoctorComponent } from './doctor/doctor.component';

export const routes: Routes = [
    
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'especialidad',
        component: EspecialidadComponent,
        title: 'Especialidad'
    },
    {
        path: 'doctor',
        component: DoctorComponent,
        title: 'Doctor'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full',
    }

];