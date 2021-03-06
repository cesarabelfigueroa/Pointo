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
	private lUser;
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

		var object = { id: this.user.idUser }
		this.dataService.getRestaurants(object).subscribe(
			data => this.restaurants = data,
			error => console.log(error)
		);


		this.dataService.getMyLocals(this.user).subscribe(
			data => this.locals = data,
			error => console.log(error)
		);
	}

	showModal3(element) {
		(<any>$('.ui.modal')).modal({ allowMultiple: false, });
		(<any>$('#modal2')).modal('show');
		this.dataService.getMyLocals(this.user).subscribe(
			data => this.locals = data,
			error => console.log(error)
		);
	}

	showModal4(local: any, element) {
		this.local = local;
		this.dataService.getMyLocals(this.user).subscribe(
			data => this.locals = data,
			error => console.log(error)
		);
		(<any>$('.ui.modal')).modal({ allowMultiple: false, });
		(<any>$('#modal3')).modal('show');
	}

	saveLocal() {
		this.dataService.saveLocal(this.local, this.user.idRestaurant).subscribe(params => { });

		this.cleanLocal();
	}

	onChangeImage(event: Event) {
		if ((<any>event.target).files && (<any>event.target).files[0]) {
			var reader = new FileReader();
			var local = this.local;
			reader.onload = function(e) {
				$('#image-preview').attr('src', (<any>e.target).result);
				if (local) {
					(<any>local).image = (<any>e.target).result;
				}
			};
			reader.readAsDataURL((<any>event.target).files[0]);
		}
	}

	deleteLocal(local: any) {
		if (this.user && this.user.idRestaurant) {
			this.dataService.deleteLocal(local).subscribe(params => { });
			this.cleanLocal();
		}
	}

	cleanLocal() {
		this.dataService.getMyLocals(this.user).subscribe(
			data => this.locals = data,
			error => console.log(error));
		this.local = {};
	}

	updateUser(r: any){
		var obj = {id_user: this.user.idUser,name: r.name, userName: r.userName, email: r.email, 
			password: r.password, image: r.image,disabled: '0'};
		this.dataService.createUser(obj).subscribe(params =>  {});

	}

}
