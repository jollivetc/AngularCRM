import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MdlModule } from '@angular-mdl/core';
import { MdlPopoverModule } from '@angular-mdl/popover';
import { MdlSelectModule } from '@angular-mdl/select';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ButtonComponent } from './component/button/button.component';
import { HelpComponent } from './component/help/help.component';
import { AuthenticationService } from './login/authentication.service';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTIntercepteurService } from './common/jwtintercepteur.service';
import { GlobalErrorHandlerService } from './common/global-error-handler.service';
import { ConsumerListComponent } from './consumers/consumer-list/consumer-list.component';
import { ConsumerFicheComponent } from './consumers/consumer-fiche/consumer-fiche.component';
import { PhonePipe } from './commun/phone.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ButtonComponent,
    HelpComponent,
    HomeComponent,
    ConsumerListComponent,
    ConsumerFicheComponent,
    PhonePipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MdlModule,
    MdlPopoverModule,
    MdlSelectModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
//    {provide: ErrorHandler, useClass: GlobalErrorHandlerService},
    { provide: HTTP_INTERCEPTORS, useClass: JWTIntercepteurService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

