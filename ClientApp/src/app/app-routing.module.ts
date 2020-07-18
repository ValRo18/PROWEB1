import { Routes, RouterModule }      from '@angular/router';
import { StartGameComponent } from './startgame/startgame.component';
import { MainViewComponent } from './main-view/main-view.component';

const appRoutes: Routes = [
    { path: 'start', component: StartGameComponent },
    { path: '', redirectTo: 'start', pathMatch: 'full' },
    {path: 'main-view', component: MainViewComponent},
    {path: '', redirectTo: 'main-view', pathMatch: 'full'}
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes );
