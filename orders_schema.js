Orders = new Mongo.Collection('orders');

OrdersSchema = new SimpleSchema({
	username: {
		type: String,
		label: 'Username',
		max: 64
	},
	song: {
		type: Object,
		label: 'Ordered song'
	},
    place: {
        type: String,
        label: 'Place of order'
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