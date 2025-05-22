import { Routes } from "@angular/router";
import { ManageRecognitionLayoutComponent } from "./manage-recognition-layout/manage-recognition-layout.component";
import { PunctuationComponent } from "./punctuation/punctuation.component";

export const MANAGE_RECOGNITION_ROUTES: Routes = [
    {
        path: '',
        component: ManageRecognitionLayoutComponent,
        children: [
            {
                path: 'puntuacion',
                component: PunctuationComponent
            }
        ]
    }
]