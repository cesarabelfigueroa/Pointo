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

	constructor(dataService: AuthenticateService, router: Router) {
		this.router = router;

		this.promotions = [{
			name: 'Agregar Local',
			image: '/assets/images/app.jpg',
			description: 'Click aqui para registrar un nuevo local',
			initDate: new Date(),
			endDate: new Date()
		}];

	}
	showModal(element){	
		(<any>$('.ui.modal')).modal({allowMultiple: false,});
		(<any>$('#modal1')).modal('show');
	}
}