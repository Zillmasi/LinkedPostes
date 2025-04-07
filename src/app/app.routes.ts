import { AuthComponent } from './LayOuts/auth/auth.component';
import { Routes } from '@angular/router';
import { RegisterComponent } from './Pages/register/register.component';
import { LoginComponent } from './Pages/login/login.component';
import { BlankComponent } from './LayOuts/blank/blank.component';
import { HomeComponent } from './Pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: 'register', component: RegisterComponent, title: 'Register' },
      { path: 'login', component: LoginComponent, title: 'Login' },
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [{ path: 'home', component: HomeComponent, title: 'Home' }],
  },
];
