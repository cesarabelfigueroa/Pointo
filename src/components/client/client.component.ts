import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
	selector: 'app-home',
	templateUrl: './client.component.html',
	styleUrls: ['./client.component.css'],
	providers: [AuthenticateService],
    entryComponents: [NavbarComponent]
})

export class ClientComponent {
    private router;
	private route;
    private user;
    private navbarItems;
    private myRestaurants = [];
    
    constructor(dataService: AuthenticateService, router: Router, route: ActivatedRoute) {
		this.router = router;
		this.route = route;
        
        dataService.getfavoriteRestaurant({}).subscribe(
        data => this.myRestaurants = data,
        error => console.log(error),
        () => console.log(this.myRestaurants));
        this.navbarItems = [{
            name: 'Principal',
            route: 'home'
        }, {
            name: 'Restaurantes',
            route: 'restaurants'
        }, {
            name: 'Perfil',
			route: 'client'
        }, {
			name: 'Salir',
			route: '/login'
		}];
    }
    

}