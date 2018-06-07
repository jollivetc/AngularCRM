import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationGuard } from './login/authentication.guard';
import { ConsumerListComponent } from './consumers/consumer-list/consumer-list.component';
import { ConsumerFicheComponent } from './consumers/consumer-fiche/consumer-fiche.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent, canActivate: [AuthenticationGuard]},
  { path: 'consumer', component: ConsumerListComponent, canActivate: [AuthenticationGuard]},
  {path: 'consumer-fiche', component: ConsumerFicheComponent, canActivate: [AuthenticationGuard]},      // Route pour création
  {path: 'consumer-fiche/:id', component: ConsumerFicheComponent, canActivate: [AuthenticationGuard]},
  { path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
