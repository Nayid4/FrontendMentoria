import { Routes } from "@angular/router";
import { UserLayoutComponent } from "./user-layout/user-layout.component";
import { HomeIndexComponent } from "./home/home-index/home-index.component";
import { RegisterUserIndexComponent } from "./register-user/register-user-index/register-user-index.component";

export const USER_ROUTES: Routes = [
    {
        path: '',
        component: UserLayoutComponent,
        children:[
            {
                path: '',
                component: HomeIndexComponent
            },
            {
                path: 'inscripcion',
                component: RegisterUserIndexComponent
            }
        ]
    }
]