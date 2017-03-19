import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
	private type;
	private navbarItems;
	private restaurant; 
	private restaurants = [];

	constructor(private dataService: AuthenticateService, router: Router) {
		this.router = router;

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
		(<any>$('.ui.modal')).modal({
			allowMultiple: false,
		});
		(<any>$('#modal0')).modal('show');
	}
}

