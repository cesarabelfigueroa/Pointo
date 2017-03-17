var Table = require('../orm/table.js');

var client = new Table({
	name: "CLIENT",
	fields: {
		id: {
			name: "id_client",
			type: "number",
			dimension: 18,
			isAutoIncrement: true
		},
        user: {
			name: "id_user",
			type: "number",
			dimension: 18,
			hasNull: false
		},
		identification: {
			name: "identification",
			type: "string",
			dimension: 15,
			hasNull: false
		},
		phone: {
			name: "phone",
			type: "string",
			dimension: 50,
			hasNull: true
		},
		birthdate: {
			name: "birthdate",
			type: "date",
			hasNull: true
		}
	}
});

module.exports = client;