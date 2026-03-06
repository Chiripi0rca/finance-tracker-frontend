import { Routes } from '@angular/router';
import { Transactions } from './pages/transactions/transactions';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'login' , component: Login
    },
    {
        path: 'register', component: Register
    },

    {
        path: 'transactions', component: Transactions, canActivate: [authGuard]
    },

    {
        path: 'dashboard', component: Dashboard, canActivate: [authGuard]
    },

    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    }
]
