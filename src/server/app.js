var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var sql = require("mssql");
var fs = require('fs');
var user = require('./models/user');
var promotion = require('./models/promotion');
var restaurant = require('./models/restaurant');

var app = express();

app.set('port', (process.env.PORT || 3000));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));



var config = {
	user: 'sa',
	password: '',
	server: 'localhost',
	database: 'Pointo'
};



app.get('/assets/images/*', function(request, response) {
	var url = request.url;
	var type = url.split('.');
	fs.readFile('..' + url, (err, data) => {
		if (!err) {
			response.writeHead(200, {
				'Content-Type': 'image/' + type.pop()
			});
			response.write(data);
		}
	});
});

app.get('/user', function(request, response) {
	user.READ({
		fields: [],
		where: {
			email: request.query.email,
			password: request.query.password
		}
	}, response);
});

app.get('/promotion',function(request,response){
   promotion.READ({
       field:[],
       where: {
           disabled: 0
       }
   },response); 
});
app.post('/savePromotion', function(request, response) {
	console.log("@savePromotion", request.body);

	if (request.body.id_promotion || request.body.id) {
		request.body.id = request.body.id_promotion || request.body.id;
		promotion.UPDATE({
			fields: request.body
		}, response);
	} else {
		promotion.CREATE(request.body, response);
	}
	// promotion.CREATE({
	// 	restaurant: request.body.restaurant,
	// 	name: request.body.name,
	// 	description: request.body.description,
	// 	types: request.body.types,
	// 	initDate: request.body.initDate,
	// 	endDate: request.body.endDate
	// }, response);
});

/*app.post('/promotion', function(request,response){
    let name:String=request.body.name;
    
   promotion.CREATE({
       
   }); 
});*/

app.get("/testJoin", function(request, response) {
	console.log("@testJoin", request.query);
	restaurant.READ({
		join: [{
			table: promotion,
			on: {
				id: {
					on: "restaurant"
				}
			}
		}],
		where: {
			id:  request.query.id
		}
	}, response);
	// response.json({});
});

app.listen(app.get('port'), function() {
	console.log('Angular 2 Full Stack listening on port ' + app.get('port'));
});


module.exports = app;


// Create the Service

/* 
	 myTable.CREATE([{
	 	name: "Cesar",
	 	userName: "cesar",
	 	password: "12345",
	 	email: "cesads@hola.com"
	},{
	 	name: "Cesar",
	 	userName: "cesar",
	 	password: "12345",
	 	email: "cesads@hola.com"
	}]);
	*/