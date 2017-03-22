import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
	selector: 'app-home',
	templateUrl: './client.component.html',
	styleUrls: ['./client.component.css'],
	providers: [AuthenticateService],
    entryComponents: [NavbarComponent]
})

export class ClientComponent {
    private router;
	private route;
    private user;
    private navbarItems;
    private myRestaurants = [];
    private data = {};
    constructor(private dataService: AuthenticateService, router: Router, route: ActivatedRoute) {
		this.router = router;
		this.route = route;
        this.user = JSON.parse(sessionStorage.getItem("loggedUser"));
        this.user.id = this.user.idUser;
        
        dataService.getfavoriteRestaurant({}).subscribe(
        data => this.myRestaurants = data,
        error => console.log(error),
        () => console.log(this.myRestaurants));
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
    }
    updateClient() {
        this.dataService.updateClient({
            user: this.user,
            client: this.user.client
        }).subscribe(
            data => this.data = data,
            error => console.log(error),
            () => this.validUser(this.data)
        );
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
            alert("Usuario Modificado con Exito")
        }
        // console.log(data);
    }
    
}