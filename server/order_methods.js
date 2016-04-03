/**
 * Created by mikedanylov on 4/3/16.
 */

import { Meteor } from 'meteor/meteor';

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
    }
});