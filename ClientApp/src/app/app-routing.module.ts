import { Routes, RouterModule }      from '@angular/router';
import { MainViewComponent } from './main-view/main-view.component';

const appRoutes: Routes = [
    { path: 'home', component: MainViewComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes );
