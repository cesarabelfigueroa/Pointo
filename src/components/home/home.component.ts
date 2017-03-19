import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { AuthenticateService } from '../../services/authenticate.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	providers: [AuthenticateService],
	entryComponents: [NavbarComponent]
})

export class HomeComponent  implements OnInit{
	private router;
	private route;
	private type;
    private promotion;
	private promotions = [];
	private navbarItems;
	private user;

	constructor(dataService: AuthenticateService, router: Router, route: ActivatedRoute) {
		this.router = router;
		this.route = route;

		this.route.params.subscribe(params => {
			this.user = params['data'];
			console.log(params);
		});

		// EJEMPLO GUARDAR/Editar PROMCION
		dataService.savePromotion({
	 	id: 3,//Si se coloca el campo id se editará
		 restaurant: 12,
			name: "Funcionando Modificado",
		description: "Hamburgesas de perro",
		types: "toneles,tonelitos,carne",
		initDate: new Date().toISOString(),
		endDate: new Date("01/20/2017").toISOString()

		 }).subscribe(params => {
		// 	//No Descomentar este reglon, sigo trabajando en ello lo de arriba si funciona
		// 	//this.newPromotion = params['data'];
		});
		console.log(dataService)
		
		dataService.getPromotion(false).subscribe(
			data => this.promotions = data,
			error => console.log(error)
		);
        
		this.navbarItems = [{
			name: 'Principal',
			isActive: true
		}, {
			name: 'Restaurantes'
		}, {
			name: 'Contact'
		}, {
			name: 'Restaurantes'
		}]
	}
    
    test(promotion : any){
        this.promotion = promotion;
        console.log(promotion);
        (<any>$('.ui.modal')).modal({
            allowMultiple: false,
        });
        (<any>$('#modal0')).modal('show');
    }
    
    newPromotion(){
        (<any>$('.ui.modal')).modal({
            allowMultiple: false,
        });
        (<any>$('#modal1')).modal('show');
    }

	ngOnInit() {
		this.route.params.subscribe(params => {
			console.log(params); // (+) converts string 'id' to a number
			// In a real app: dispatch action to load the details here.
		});
	}
}