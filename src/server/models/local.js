var Table = require('../orm/table.js');

var local = new Table({
	name: "LOCAL",
	fields: {
		id: {
			name: "id_local",
			type: "number",
			dimension: 18,
			isAutoIncrement: true
		},
        restaurant: {
			name: "id_restaurant",
			type: "number",
			dimension: 18,
			hasNull: false
		},
		adress: {
			name: "address",
			type: "string",
			dimension: 50,
			hasNull: true
		},
		phone: {
			name: "phone",
			type: "string",
			dimension: 50,
			hasNull: true
		},
		gerent: {
			name: "gerent",
			type: "string",
			dimension: 50,
			hasNull: true
		},
		initAt: {
			name: "initAt",
			type: "date",
            hasNull: true
		},
        endAt: {
			name: "endAt",
			type: "date",
			hasNull: true
		},
		disabled: {
			name: "disabled",
			type: "number",
			defaultValue: 0
		}
	}
});

module.exports = local;