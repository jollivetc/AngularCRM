import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSelectModule,
    MatFormFieldModule, MatInputModule, MatIconModule, MatTooltipModule, MatTableModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DummyComponent } from './component/dummy/dummy.component';
import { HelpComponent } from './component/help/help.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { JWTIntercepteurService } from './common/jwtintercepteur.service';
import { PhonePipe } from './common/phone.pipe';
import { ConsumerListeComponent } from './consumer/consumer-liste/consumer-liste.component';
import { ConsumerFicheComponent } from './consumer/consumer-fiche/consumer-fiche.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DummyComponent,
    HelpComponent,
    HomeComponent,
    PhonePipe,
    ConsumerListeComponent,
    ConsumerFicheComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JWTIntercepteurService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
