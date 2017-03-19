var Table = require('../orm/table.js');

var restaurant_promotion = new Table({
	name: "RESTAURANT_PROMOTION",
	fields: {
        restaurant: {
			name: "id_restaurant",
			type: "number",
			dimension: 18,
			hasNull: false
		},
        promotion: {
			name: "id_promotion",
			type: "number",
			dimension: 18,
			hasNull: false
		}
	}
});

module.exports = restaurant_promotion;