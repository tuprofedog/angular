import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { Login } from './login/login';
import { LandingPage } from './landing-page/landing-page';

export const routes: Routes = [
    // { path: 'login', component: Login },
    // { path: 'home', component: LandingPage, canActivate: [AuthGuard] },
    { path: '', component: LandingPage },
    { path: '**', redirectTo: '' }
];
