import { Routes } from "@angular/router";
import { ManageCertificationLayoutComponent } from "./manage-certification-layout/manage-certification-layout.component";
import { ApplicationCertificationComponent } from "./application-certification/application-certification.component";

export const MANAGE_CERTIFICATION_ROUTES : Routes  = [
    {
        path: '',
        component: ManageCertificationLayoutComponent,
        children: [
            {
                path: 'solicitud',
                component: ApplicationCertificationComponent
            }
        ]
    }
]