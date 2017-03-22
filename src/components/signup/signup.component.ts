import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';


@Component({
	selector: 'app-home',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css'],
	providers: [AuthenticateService]
})

export class SignUpComponent implements OnInit {

	private user = {
		type: ''
	};


	constructor(private dataService: AuthenticateService) {

	}

	submit(){
		this.dataService.createUser(this.user).subscribe(params => { });
	}


	changeProperty(type: any){
		this.user.type = type;
	}

	ngOnInit() {
		
	}
}
