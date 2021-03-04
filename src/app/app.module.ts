import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppMaterialModule} from './app-material.module';
import {HelpComponent} from './component/help/help.component';
import {DummyComponent} from './component/dummy/dummy.component';
import {HomeComponent} from './home/home.component';
import {ConsumerListeComponent} from './consumer/consumer-liste/consumer-liste.component';
import {ConsumerFicheComponent} from './consumer/consumer-fiche/consumer-fiche.component';
import {JWTIntercepteurService} from './common/jwtintercepteur.service';
import {PhonePipe} from './common/phone.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HelpComponent,
    DummyComponent,
    HomeComponent,
    ConsumerListeComponent,
    ConsumerFicheComponent,
    PhonePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppMaterialModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: JWTIntercepteurService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
