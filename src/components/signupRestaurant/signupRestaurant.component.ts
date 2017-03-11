import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
	selector: 'app-signupRestaurant',
	templateUrl: './signupRestaurant.component.html',
	styleUrls: ['./signupRestaurant.component.css'],
	providers: [AuthenticateService]
})

export class signupRestaurantComponent {
	private router;
	private type;
	private promotions;
	private menubar;

	constructor(dataService: AuthenticateService, router: Router) {
		this.router = router;

		this.promotions = [{
			name: 'Food 2*1',
			image: '/assets/images/app.jpg',
			description: 'Pay one and have two',
			initDate: new Date(),
			endDate: new Date()
		}, {
			name: 'Food 2*1',
			image: '/assets/images/app.jpg',
			description: 'Pay one and have two',
			initDate: new Date(),
			endDate: new Date()
		}, {
			name: 'Food 2*1',
			image: '/assets/images/app.jpg',
			description: 'Pay one and have two',
			initDate: new Date(),
			endDate: new Date()
		}];

		this.menubar = [{
			name: 'Principal',
			isActive: true
		}, {
			name: 'Restaurantes'
		}, {
			name: 'Contact'
		}, {
			name: 'Restarantes'
		}]
	}
}