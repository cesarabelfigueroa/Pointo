import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.controller';
import { SignUpComponent } from './components/signup/signup.component';
import { ClientComponent } from './components/client/client.component';
import { signupRestaurantComponent } from './components/signupRestaurant/signupRestaurant.component';
import { restaurantComponent } from './components/restaurant/restaurant.component';

const routes: Routes = [
	{path: 'restaurants', component: restaurantComponent, pathMatch: 'prefix'},
	{path: 'signupRestaurant', component: signupRestaurantComponent, pathMatch: 'prefix'},
	{ path: 'login', component: LoginComponent, pathMatch: 'prefix' },
	{ path: 'signup', component: SignUpComponent, pathMatch: 'prefix' },
	{ path: 'home', component: HomeComponent,pathMatch: 'prefix' },
    { path: 'client', component: ClientComponent,pathMatch: 'prefix' 
    },
	{ path: '', redirectTo: 'login',  pathMatch: 'full'}

];

export const routing = RouterModule.forRoot(routes);