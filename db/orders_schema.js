Orders = new Mongo.Collection('orders');

OrdersSchema = new SimpleSchema({
	username: {
		type: String,
		label: 'User name'
	},
	song: {
		type: String,
		label: 'Order Song name'
	},
    place: {
        type: String,
        label: 'Order Place name'
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