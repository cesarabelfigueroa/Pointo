import { Component } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router, Route } from '@angular/router';


@Component({
	selector: 'app-root',
	templateUrl: './login.controller.html',
	styleUrls: ['./login.controller.css'],
	providers: [AuthenticateService]
})

export class LoginComponent {

	private user;
	private data = {};
	private router;


	constructor(private dataService: AuthenticateService, router: Router) {
		this.user = {};
		this.router = router;
	}

	submitLogin() {

		this.dataService.getUsers(this.user).subscribe(
			data => this.data = data,
			error => console.log(error),
			() => this.validUser(this.data)
		);

		console.log($);
		// (<any>$('.ui.basic.modal')).modal('show');




		// console.log(AuthenticateService);
	}


	validUser(data: any) {
		//Temporal
		if (data.length > 0) {
			data = data[0];
			var userInfo = {
				idUser: data.id,
				name: data.name,
				userName: data.userName,
				idClient: data["CLIENT.id"],
				idRestaurant: data["RESTAURANT.id"],
				email: data.email,
				restaurant: {},
				client: {}
			};

			if (data["RESTAURANT.id"]) {
				userInfo.restaurant = {
					id: data["RESTAURANT.id"],
					represent: data["RESTAURANT.represent"],
					rtn: data["RESTAURANT.rtn"]
				}
			} else if (data["CLIENT.id"]) {
				userInfo.client = {
					id: data["CLIENT.id"],
					birthdate: data["CLIENT.birthdate"],
					identification: data["CLIENT.identification"],
					phone: data["CLIENT.phone"]
				}
			}

			sessionStorage.setItem("loggedUser", JSON.stringify(userInfo));

			this.router.navigate(['/home/']);
		}
		// console.log(data);
	}
}
