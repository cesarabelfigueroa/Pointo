var express = require('express');
var fs = require('fs');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var sql = require("mssql");
var fs = require('fs');
var user = require('./models/user');
var promotion = require('./models/promotion');
var client = require('./models/client');
var client_restaurant = require('./models/client_restaurant');
var local = require('./models/local');
var restaurant = require('./models/restaurant');

var app = express();

app.set('port', (process.env.PORT || 3000));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));


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

app.get('/getUser', function(request, response) {
	var _optionsQuery = {
		field: [],
		where: {
			disabled: 0
		}
	};

	_optionsQuery.where.id = request.query.id;
	user.READ(_optionsQuery, response);	
});

app.get('/user', function(request, response) {
	user.READ({
		fields: ["id", "name", "userName", "email"],
		join: [{
			table: client,
			outer: "left",
			on: {
				id: {
					on: "user"
				}
			}
		}, {
			table: restaurant,
			outer: "left",
			on: {
				id: {
					on: "idUser"
				}
			}
		}],
		where: {
			email: request.query.email,
			password: request.query.password
		}
	}, response);
});

app.get('/promotion', function(request, response) {
	var _optionsQuery = {
		field: [],
		where: {
			disabled: 0
		}
	};

	if (request.query.idRestaurant) {
		_optionsQuery.where.restaurant = request.query.idRestaurant;
	}

	promotion.READ(_optionsQuery, response);
});

app.post('/savePromotion', function(request, response) {
	var data = request.body.image;
	var base64Data = data.replace(/^data:image\/png;base64,/, '');
	var url = "./src/assets/images/" + request.body.name + ".png";
	fs.writeFile(url, base64Data, "base64", function(err) {
		request.body.image = "/assets/images/" + request.body.name + ".png";
		if (request.body.id_promotion || request.body.id) {
			request.body.id = request.body.id_promotion || request.body.id;
			promotion.UPDATE({
				fields: request.body
			}, response);
		} else {
			promotion.CREATE(request.body, response);
		}
	});
})



app.get('/local', function(request, response) {
	local.READ({
		field: []
	}, response);
});

app.post('/deletePromotion', function(request, response) {
	promotion.UPDATE({
		fields: request.body
	}, response);
})

app.post('/deleteLocal', function(request, response) {
	local.UPDATE({
		fields: request.body
	}, response);
})

app.post('/saveLocal', function(request, response) {
	console.log("Save Local", request.body);
	if (request.body.id_local || request.body.id) {
		request.body.id = request.body.id_local || request.body.id;
		local.UPDATE({
			fields: request.body
		}, response);
	} else {
		local.CREATE(request.body, response);
	}
});

app.get("/restaurant", function(request, response) {
	console.log("@restaurant", request.query);
	var object = {};
	try {
		object = JSON.parse(request.query.object);
	} catch (e) {
		console.error(e)

	}
	var _optionsQuery = {
		fields: ["id", "name", "userName","email","password" ],
		join: [{
			table: restaurant,
			fields: ["id", "idUser", "represent", "rtn"],
			on: {
				id: {
					on: "idUser"
				}
			}
		}],
		where: {
			disabled: 0
		}
	};

	if (object.name) {
		_optionsQuery.where.name = {
			LIKE: "%" + object.name + "%"
		};
	}
	if (object.id) {
		_optionsQuery.where.id = object.id;
	}
	user.READ(_optionsQuery, response);
});


app.post("/createUser", function(request, response) {
	if (request.body.id_user || request.body.id) {
		request.body.id = request.body.id_user || request.body.id;
		user.UPDATE({
			fields: request.body
		}, response);
	} else {
		user.CREATE(request.body, response);
	}
});

app.get("/testJoin", function(request, response) {
	user.READ({
		join: [{
			table: restaurant,
			on: {
				id: {
					on: "idUser"
				}
			}
		}, {
			table: promotion,
			leftTable: promotion,
			on: {
				id: {
					on: "restaurant"
				}
			}
		}],
		where: {
			id: request.query.id
		}
	}, response);
});



app.listen(app.get('port'), function() {
	console.log('Angular 2 Full Stack listening on port ' + app.get('port'));
});

app.get("/myLocals", function(request,response){

	var _optionsQuery = {
		field: [],
		where: {
			disabled: 0
		}
	};

	_optionsQuery.where.restaurant = request.query.idRestaurant;
	local.READ(_optionsQuery, response);
});

app.get("/favoriteRestaurant", function(request, response) {
	client_restaurant.READ({
		join: [{
			table: restaurant,
			on: {
				restaurant: {
					on: "id"
				}
			}
		}, {
			table: client,
			on: {
				client: request.query.id_client
			}
		}, {
			leftTable: restaurant,
			table: user,
			on: {
				idUser: {
					on: "id"
				}
			}
		}]
	}, response);
});

app.post("/favoriteRestaurant", function(request, response) {
    client_restaurant.CREATE(request.body, response);
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