import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
	selector: 'app-restaurant',
	templateUrl: './restaurant.component.html',
	styleUrls: ['./restaurant.component.css'],
	providers: [AuthenticateService],
	entryComponents: [NavbarComponent]
})

export class restaurantComponent {
	private router;
    private route;
	private type;
	private navbarItems;
	private restaurant; 
	private restaurants = [];
	private promotions = [];
    private client_restaurant;
    private user;

	constructor(private dataService: AuthenticateService, router: Router, route: ActivatedRoute) {
		this.router = router;
        this.route = route;
        this.user = JSON.parse(sessionStorage.getItem('loggedUser'));
        
		this.navbarItems = [{
			name: 'Principal',
			isActive: true
		}, {
			name: 'Restaurantes'
		}, {
			name: 'Contact'
		}, {
			name: 'Restaurantes'
		}]

		dataService.getRestaurants("").subscribe(
			data => this.restaurants = data,
			error => console.log(error)
		);
	}

	showModal(restaurant: any, element){
		this.restaurant = restaurant;
		this.dataService.getPromotion(this.restaurant["RESTAURANT.id"]).subscribe(
			data => this.promotions = data,
			error => console.log(error)
		);
		(<any>$('.ui.modal')).modal({
			allowMultiple: false,
		});
		(<any>$('#modal0')).modal('show');
	}
    
    showModal2(restaurant:any){
        if (this.user.idClient) {
            this.restaurant =restaurant;
            this.client_restaurant = [{
                client: this.user.idClient
            }, {   
                restaurant: this.restaurant.id
            }]; 
            console.log(this.client_restaurant);
        }
    }
}

