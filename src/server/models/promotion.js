var Table = require('../orm/table.js');

var user = new Table({
	name: "PROMOTION",
	fields: {
		id: {
			name: "id_promotion",
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
			name: "name",
			type: "string",
			dimension: 50,
			hasNull: true
		},
		description: {
			name: "description",
			type: "string",
			dimension: 500,
			hasNull: true
		},
		types: {
			name: "types",
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

module.exports = user;