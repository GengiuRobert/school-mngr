import { Routes } from '@angular/router';
import { HomeComponent } from '../components/pages/home/home.component';
import { LoginComponent } from '../components/register/login/login.component';
import { SignupComponent } from '../components/register/signup/signup.component';
import { ErrorComponent } from '../components/pages/error/error.component';
import { AdminComponent } from '../components/views/admin/admin.component';
import { StudentComponent } from '../components/views/student/student.component';
import { ProfessorComponent } from '../components/views/professor/professor.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'student', component: StudentComponent },
    { path: 'professor', component: ProfessorComponent },
    { path: '404', component: ErrorComponent },
    { path: '**', redirectTo: '/404' }

];
