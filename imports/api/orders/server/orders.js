
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Orders = new Mongo.Collection('orders');

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
	priority: {
       type: Number,
       label: 'Order Priority',
       defaultValue:  0
   },
    status: {
        type: String,
        label: 'Status of the song reservation',
        allowedValues: ['canceled', 'processing', 'completed'],
        defaultValue: 'processing'
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
    },
    'orders.updateStatus'(orderId, newStatus) {
        new SimpleSchema({
            orderId: {type: String, label: 'Order mongo id'},
            newStatus: {type: String, label: 'New order status'}
        }).validate({orderId, newStatus});

        var result = Orders.update({_id: orderId}, {$set: {status: newStatus}});

        console.log('Meteor::methods::orders.updateStatus: order status updated:' + result);
        return result;
    }
});

/**
 * publish all Orders from database
 * @return  {object}    mongodb cursor for all karaoke places
 */
Meteor.publish('orders', () => {
    return Orders.find();
});