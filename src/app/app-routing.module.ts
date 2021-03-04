import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AuthenticationGuard} from './login/authentication.guard';
import {ConsumerListeComponent} from './consumer/consumer-liste/consumer-liste.component';
import {ConsumerFicheComponent} from './consumer/consumer-fiche/consumer-fiche.component';

export const appRoutes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]},
  {
    path: 'consumer', component: ConsumerListeComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'consumer-fiche', component: ConsumerFicheComponent,
    canActivate: [AuthenticationGuard]
  },      // Route pour création
  {
    path: 'consumer-fiche/:id', component: ConsumerFicheComponent,
    canActivate: [AuthenticationGuard]
  },   // Route pour édition
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {
}
