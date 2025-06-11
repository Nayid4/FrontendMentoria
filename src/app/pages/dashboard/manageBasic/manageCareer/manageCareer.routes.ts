import { Routes } from "@angular/router";
import { ManageCareerLayoutComponent } from "./manage-career-layout/manage-career-layout.component";
import { CareerListComponent } from "./career-list/career-list.component";

export const MANAGE_CAREER_ROUTES: Routes = [
    {
        path: '',
        component: ManageCareerLayoutComponent,
        children: [
            { path: '', component: CareerListComponent }
        ]
    }
]