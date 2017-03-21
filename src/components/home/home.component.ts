import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	providers: [AuthenticateService],
	entryComponents: [NavbarComponent]
})
export class HomeComponent implements OnInit {
	private router;
	private route;
	private type;
	private promotion;
	private promotions = [];
	private navbarItems;
	private searchOptions = [];
	private user;
	private filterHolder = '';


	constructor(private dataService: AuthenticateService, router: Router, route: ActivatedRoute) {
		this.router = router;
		this.route = route;
		this.user = JSON.parse(sessionStorage.getItem('loggedUser'));
		if (this.user) {
			var idRestaurant = this.user.idRestaurant;
			if (idRestaurant) {
				dataService.getPromotion(idRestaurant).subscribe(
					data => this.promotions = data,
					error => console.log(error));
				this.navbarItems = [{
					name: 'Principal',
					route: 'home'
				}, {
					name: 'Locales',
					route: 'local'
				}, {
					name: 'Perfil',
					route: 'signupRestaurant'
				}, {
					name: 'Salir',
					route: 'login'
				}];

				this.searchOptions = [{
					name: 'Nombre',
					value: 'name'
				}];

			} else {
				dataService.getPromotion(-1).subscribe(
					data => this.promotions = data,
					error => console.log(error));
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
	}

	showModal1(promotion: any) {
		if (this.user.idRestaurant) {
			this.promotion = promotion;
			(<any>$('.ui.modal')).modal({
				allowMultiple: false,
			});
			(<any>$('#modal0')).modal('show');
		}
	}

	showModal2(promotion: any) {
		if (this.user.idRestaurant) {
			this.promotion = promotion;
			(<any>$('.ui.modal')).modal({
				allowMultiple: false,
			});

			(<any>$('#modal1')).modal('show');
		}
	}

	savePromotion() {
		if (this.user.idRestaurant) {
			this.dataService.savePromotion(this.promotion).subscribe(params => { });
			this.dataService.getPromotion(this.user.idRestaurant).subscribe(
				data => this.promotions = data,
				error => console.log(error));

		}
	}

	onChangeFilter(ev: Event) {
		this.filterHolder = (<any>event.target).value.toUpperCase();
	}

	onChangeImage(event: Event) {
		if ((<any>event.target).files && (<any>event.target).files[0]) {
			console.log(event);
			var reader = new FileReader();
			var promotion = this.promotion;
			reader.onload = function(e) {
				$('#image-preview').attr('src', (<any>e.target).result);
				if (promotion) {
					promotion.image = (<any>e.target).result;
				}
			};
			reader.readAsDataURL((<any>event.target).files[0]);
		}

	}

	deletePromotion(promotion: any) {
		if (this.user && this.user.idRestaurant) {
			this.dataService.deletePromotion(promotion).subscribe(params => { });
			this.dataService.getPromotion(this.user.idRestaurant).subscribe(
				data => this.promotions = data,
				error => console.log(error));
		}
	}

	ngOnInit() {

	}
}