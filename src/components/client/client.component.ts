import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';

@Component({
	selector: 'app-home',
	templateUrl: './client.component.html',
	styleUrls: ['./client.component.css'],
	providers: [AuthenticateService]
})

export class ClientComponent {
    private router;
	private route;
    private user;
    
    constructor(dataService: AuthenticateService, router: Router, route: ActivatedRoute) {
		this.router = router;
		this.route = route;
    }

}