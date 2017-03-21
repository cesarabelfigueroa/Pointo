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
			sessionStorage.setItem("loggedUser", JSON.stringify({
				idUser: data[0].id,
				idClient: data[0]["CLIENT.id"],
				idRestaurant: data[0]["RESTAURANT.id"]
			}));

			this.router.navigate(['/home/']);
		}
		// console.log(data);
	}
}
