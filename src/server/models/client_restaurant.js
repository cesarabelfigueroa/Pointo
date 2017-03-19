var Table = require('../orm/table.js');

var client_restaurant = new Table({
	name: "CLIENT_RESTAURANT",
	fields: {
		client: {
			name: "id_client",
			type: "number",
			dimension: 18,
			hasNull: false
		},
        restaurant: {
			name: "id_restaurant",
			type: "number",
			dimension: 18,
			hasNull: false
		}
	}
});

module.exports = client_restaurant;