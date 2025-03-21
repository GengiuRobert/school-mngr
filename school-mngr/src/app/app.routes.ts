import { Routes } from '@angular/router';
import { HomeComponent } from '../components/pages/home/home.component';
import { LoginComponent } from '../components/register/login/login.component';
import { SignupComponent } from '../components/register/signup/signup.component';
import { ErrorComponent } from '../components/pages/error/error.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '404', component: ErrorComponent },
    { path: '**', redirectTo: '/404' }

];
