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
	}

	showModal(element){
		(<any>$('.ui.modal')).modal({
			allowMultiple: false,
		});
		(<any>$('#modal0')).modal('show');
	}


}

