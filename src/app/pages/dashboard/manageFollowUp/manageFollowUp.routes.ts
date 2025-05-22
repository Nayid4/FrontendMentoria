import { Routes } from "@angular/router";
import { ManageActivityLayoutComponent } from "../manageActivity/manage-activity-layout/manage-activity-layout.component";
import { Component } from "@angular/core";
import { CurrentStateComponent } from "./current-state/current-state.component";


export const MANAGE_FOLLOW_UP_ROUTES: Routes = [
    {
        path: '',
        component: ManageActivityLayoutComponent,
        children: [
            {
                path: 'estado-actual',
                component: CurrentStateComponent
            }
        ]
    }
]