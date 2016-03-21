Orders = new Mongo.Collection('orders');

OrdersSchema = new SimpleSchema({
	username: {
		type: String,
		label: 'Username',
		max: 64
	},
	song: {
		type: String,
		label: 'Order Song id'
	},
    place: {
        type: String,
        label: 'Order Place id'
    },
	createdAt: {
		type: Date,
		label: 'Created at',
		autoValue: function() {
			if (this.isInsert) {
				return new Date();
			}
		}
	}
});

Orders.attachSchema(OrdersSchema);