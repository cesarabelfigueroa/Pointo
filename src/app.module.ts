import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import * as $ from 'jquery';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.controller';
import { AppComponent } from './components/app/app.controller';
import { AuthenticateService } from './services/authenticate.service';
import { SignUpComponent } from './components/signup/signup.component';
import { ClientComponent } from
'./components/client/client.component';
import { signupRestaurantComponent } from './components/signupRestaurant/signupRestaurant.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { routing } from './routes';
import { HashLocationStrategy, LocationStrategy, Location } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    ClientComponent,
    signupRestaurantComponent,
    NavbarComponent
  ],
  imports: [
    routing,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  exports: [
    NavbarComponent
  ],
  providers: [AuthenticateService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
