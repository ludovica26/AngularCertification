import { Routes } from '@angular/router';
import { ConfigModelColorComponent } from './config-model-color/config-model-color.component';
import { ConfigOptionComponent } from './config-option/config-option.component';
import { RecapInfoComponent } from './recap-info/recap-info.component';

export const routes: Routes = [
    {
        path: '',
        component: ConfigModelColorComponent,
        pathMatch: 'full'
    },
    {
        path: 'option',
        component: ConfigOptionComponent,
    },
    {
        path: 'recap',
        component: RecapInfoComponent,
    }
];
