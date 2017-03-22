import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
	selector: 'app-local',
	templateUrl: './local.component.html',
	styleUrls: ['./local.component.css'],
	providers: [AuthenticateService]
})

export class localComponent {
	private router;
	private type;
	private promotions;
	private user;
	private navbarItems;
	private restaurants = [];
	private locals = [];
	private searchOptions = [];
	private local = {};

	constructor(private dataService: AuthenticateService, router: Router) {
		this.router = router;
		this.user = JSON.parse(sessionStorage.getItem('loggedUser'));
		if (this.user) {
			var idRestaurant = this.user.idRestaurant;
			if (idRestaurant) {
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
			} else {
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
		this.promotions = [{
			name: 'Agregar Local',
			image: '/assets/images/app.jpg',
			description: 'Click aqui para registrar un nuevo local',
			initDate: new Date(),
			endDate: new Date()
		}];

		this.dataService.getRestaurants(this.user.idUser).subscribe(
			data => this.restaurants = data,
			error => console.log(error)
		);


		this.dataService.getMyLocals(idRestaurant).subscribe(
				data => this.locals = data,
				error => console.log(error)
			);

	}

	showModal(element){
		this.local = {};	
		(<any>$('.ui.modal')).modal({allowMultiple: false,});
		(<any>$('#modal2')).modal('show');
		this.dataService.getMyLocals(this.user.idRestaurant).subscribe(
				data => this.locals = data,
				error => console.log(error)
			);
	}

	showModal2(local: any, element){
		this.local = local;
		
		this.dataService.getMyLocals(this.user.idRestaurant).subscribe(
				data => this.locals = data,
				error => console.log(error)
			);
		(<any>$('.ui.modal')).modal({allowMultiple: false,});
		(<any>$('#modal3')).modal('show');
	}

	saveLocal(){
		this.dataService.saveLocal(this.local).subscribe(params =>  {});
		this.dataService.getMyLocals(this.user.idRestaurant).subscribe(
				data => this.locals = data,
				error => console.log(error)
			);
	}

	deleteLocal(local:any){
		if (this.user && this.user.idRestaurant) {
			this.dataService.deleteLocal(local).subscribe(params => { });
			this.dataService.getMyLocals(this.user.idRestaurant).subscribe(
				data => this.locals = data,
				error => console.log(error));
			}
	}

}
