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
	private user;
	private restaurants;
	private locals;
	private local;
	private rUser;
	private promotions = [];
	private searchOptions = [];

	constructor(private dataService: AuthenticateService, router: Router) {
		this.router = router;
		this.user = JSON.parse(sessionStorage.getItem('loggedUser'));
		if (this.user) {
			var idRestaurant = this.user.idRestaurant;
			if (idRestaurant) {
				this.locals = [];
				this.navbarItems = [{
					name: 'Principal',
					route: 'home'
				}, {
					name: 'Locales',
					route: 'restaurants'
				}, {
					name: 'Perfil',
					route: 'local'
				}, {
					name: 'Salir',
					route: 'login'
				}];

				this.searchOptions = [{
					name: 'Nombre',
					value: 'name'
				}];

				dataService.getMyLocals(idRestaurant).subscribe(
				data => this.locals = data,
				error => console.log(error)
			);

			} else {
				this.restaurants = [];
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


				this.searchOptions = [{
					name: 'Nombre',
					value: 'name'
				}, {
					name: 'Restaurante',
					value: 'restaurant'
				}];

				dataService.getRestaurants("").subscribe(
					data => this.restaurants = data,
					error => console.log(error)
				);

			}
		} else {
			this.navbarItems = [{
				name: 'Principal',
				route: 'home'
			}, {
				name: 'Restaurantes',
				route: 'restaurants'
			}, {
				name: 'Inscribirse',
				route: 'singup'
			}];

			this.searchOptions = [{
				name: 'Nombre',
				value: 'name'
			}, {
				name: 'Restaurante',
				value: 'restaurant'
			}];
			
		}

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

	showModal2(local : any,element){
		this.local = local;
		(<any>$('.ui.modal')).modal({
			allowMultiple: false,
		});
		(<any>$('#modal1')).modal('show');
	}

	cleanObjects(element){
		this.router.navigate(['/restaurants']);
	}
}

