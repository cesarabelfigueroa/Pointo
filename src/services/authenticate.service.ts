import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticateService {
	private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
	private options = new RequestOptions({ headers: this.headers });

	constructor(private http: Http) { }

	getUsers(user : any): Observable<any> {
		console.log(user);
		return this.http.get('/user?email=' + user.email+ '&password=' + user.password).map(res => res.json());
	}
    
    getPromotion(): Observable<any> {
        return this.http.get('/promotion').map(res => res.json());
    }

	getTable(): Observable<any> {
		return this.http.get('/table').map(res => res.json());
	}

	savePromotion(promotion : any) {
		console.log(promotion);
		return this.http.post("/savePromotion", promotion, {headers: this.headers}).map(res => res.json());
	}

	testJoin(test : any) {
		console.log(test);
		return this.http.get("/testJoin").map(res => res.json());
	}
	getRestaurants(test : any) {
		console.log(test);
		return this.http.get("/restaurant?object=" + JSON.stringify(test)).map(res => res.json());
	}


}



/* 

<form action="/promotion" method="post">
<input name="name"/> 

<button type="submit"></button>

</form>

*/
