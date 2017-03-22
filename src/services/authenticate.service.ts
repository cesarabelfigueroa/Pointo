import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticateService {
	private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
	private options = new RequestOptions({ headers: this.headers });

	constructor(private http: Http) { }

	getUsers(user: any): Observable<any> {
		console.log(user);
		return this.http.get('/user?email=' + user.email + '&password=' + user.password).map(res => res.json());
	}

	
	getPromotion(restaurant: any): Observable<any> {
		var URL = '/promotion';

		if (restaurant) {
			URL += "?idRestaurant=" + restaurant;
		}
		return this.http.get(URL).map(res => res.json());
	}


	getPromotionByName(name): Observable<any> {
		return this.http.get('/getPromotionsByName?name='+name).map(res => res.json());
	}

	getPromotionByRestaurant(name): Observable<any> {
		return this.http.get('/getPromotionsByRestaurant?restaurant='+name).map(res => res.json());
	}

	getTable(): Observable<any> {
		return this.http.get('/table').map(res => res.json());
	}

	getLocals(): Observable<any> {
		return this.http.get('/local').map(res => res.json());
	}

	getLocal(id: any): Observable<any> {
		return this.http.get('/local').map(res => res.json());
	}

	savePromotion(promotion: any) {
		if (!promotion.hasOwnProperty("restaurant")) {
			var restaurantData = JSON.parse(sessionStorage.getItem("loggedUser"));
			var idRestaurant = restaurantData.idRestaurant;
			promotion.restaurant = idRestaurant;
		}
		console.log(promotion);
		return this.http.post("/savePromotion", promotion, { headers: this.headers }).map(res => res.json());
	}

	deletePromotion(promotion: any) {
		promotion.disabled = 1;
		return this.http.post("/deletePromotion", promotion, { headers: this.headers }).map(res => res.json());
	}

	deleteLocal(local: any) {
		local.disabled = 1;
		return this.http.post("/deleteLocal", local, { headers: this.headers }).map(res => res.json());
	}

	testJoin(test: any) {
		console.log(test);
		return this.http.get("/testJoin?id=" + test).map(res => res.json());
	}
	getRestaurants(test: any) {
		console.log(test);
		return this.http.get("/restaurant?object=" + JSON.stringify(test)).map(res => res.json());
	}


	saveLocal(local: any , id : any) {
		local.restaurant = id;
		return this.http.post("/saveLocal", local, { headers: this.headers }).map(res => res.json());
	}


	createUser(user: any){
		console.log(user);
		return this.http.post("/createUser", user, { headers: this.headers }).map(res => res.json());
	}

	getfavoriteRestaurant(client: any) {
		var clientData = JSON.parse(sessionStorage.getItem("loggedUser"));
		var idClient = clientData.idClient;
		return this.http.get("/favoriteRestaurant?id_client=" + idClient).map(res => res.json());
	}
    
    createFavoriteRestaurant(client_restaurant: any){
        return this.http.post("/favoriteRestaurant", client_restaurant, { headers: this.headers }).map(res => res.json());
    } 

	getMyLocals(restaurant: any): Observable<any> {
		console.log("En service: ", restaurant);
		return this.http.get("/myLocals?idRestaurant=" + restaurant.idRestaurant).map(res => res.json());
	}


	getUser2(user: any): Observable<any> {
		console.log("En service: ", user);
		console.log("En service: ", user.id);
		return this.http.get("/getUser?id=" + user).map(res => res.json());
	}
	
	updateClient(client: any) {
		console.log(client);
		return this.http.post("/updateClient", client, { headers: this.headers }).map(res => res.json());

	}

}
