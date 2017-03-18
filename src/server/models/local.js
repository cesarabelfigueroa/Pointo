var Table = require('../orm/table.js');

var local = new Table({
	name: "Local",
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
		name: {
			name: "adress",
			type: "string",
			dimension: 50,
			hasNull: true
		},
		description: {
			name: "phone",
			type: "string",
			dimension: 50,
			hasNull: true
		},
		types: {
			name: "gerent",
			type: "string",
			dimension: 50,
			hasNull: true
		},
		initDate: {
			name: "initDate",
			type: "date",
            hasNull: true
		},
        endDate: {
			name: "endDate",
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