import { Routes } from "@angular/router";
import { LoginInComponent } from "./login-in/login-in.component";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
import { AuthLayoutComponent } from "./auth-layout/auth-layout.component";

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        component: AuthLayoutComponent,
        children:[
            {
                path: 'iniciar-sesion',
                component: LoginInComponent
            },
            {
                path: 'olvidar-contrasena',
                component: ForgetPasswordComponent
            }
        ]
    }
]