var Table = require('../orm/table.js');

var restaurant = new Table({
	name: "RESTAURANT",
	fields: {
		id: {
			name: "id_restaurant",
			type: "number",
			dimension: 2,
			isAutoIncrement: true
		},
		idUser: {
			name: "id_user",
			type: "number",
			dimension: 10,
			hasNull: false
		},
		represent: {
			name: "represent",
			type: "string",
			dimension: 10,
			hasNull: false
		},
		rtn: {
			name: "rtn",
			type: "string"
		}
	}
});

module.exports = restaurant;