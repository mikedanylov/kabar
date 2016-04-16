
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Orders = new Mongo.Collection('orders');

//OrdersSchema = new SimpleSchema({
//	username: {
//		type: String,
//		label: 'User name'
//	},
//	song: {
//		type: String,
//		label: 'Order Song name'
//	},
//    place: {
//        type: String,
//        label: 'Order Place name'
//    },
//	priority: {
//        type: Number,
//        label: 'Order Priority',
//        defaultValue:  0
//    },
//	createdAt: {
//		type: Date,
//		label: 'Created at',
//		autoValue: function() {
//			if (this.isInsert) {
//				return new Date();
//			}
//		}
//	}
//});
//
//Orders.attachSchema(OrdersSchema);

Meteor.methods({
    'orders.placeOrder'(song, place, username) {
        new SimpleSchema({
            username: { type: String, label: 'User name' },
            song: { type: String, label: 'Order Song name' },
            place: { type: String, label: 'Order Place name' },
            priority: {
                type: Number,
                label: 'Order Priority',
                optional: true,
                defaultValue: function() {
                    return 0;
                }
            },
            createdAt: {
                type: Date,
                label: 'Created at',
                optional: true,
                defaultValue: function() {
                    return new Date();
                }
            }
        }).validate({ song, place, username });

        var cur = Orders.insert({
            username: username,
            song: song,
            place: place,
            priority: 0,
            createdAt: new Date()
        });

        console.log('Meteor::methods::orders.placeOrder: order placed with id ' + cur);
        return cur;
    }
});