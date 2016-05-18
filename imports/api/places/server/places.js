/**
 * Created by mikedanylov on 4/15/16.
 */


import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Songs } from '/imports/api/songs/server/songs'

export const Places = new Mongo.Collection('places');

// db for songslist collection
PlacesSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Name',
        max: 64
    },
    address: {
        type: String,
        label: 'Address',
        max: 256
    },
    popularity: {
        type: Number,
        label: 'Total reservation counter',
        defaultValue: 0,
        min: 0
    },
    admin: {
        type: [String],
        label: 'Karaoke place admin'
    },
    queue: {
        type: [Object],
        label: 'Current orders queue in karaoke',
        defaultValue: []
    },
    'queue.$.priority': {
        type: Number,
        label: 'Order queue priority number'
    },
    'queue.$.order': {
        type: String,
        label: 'Order Id'
    },
    queueSize: {
        type: Number,
        label: 'Current orders queue length',
        defaultValue: 0
    },
    createdAt: {
        type: Date,
        label: 'Created at',
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            }
        }
    },
    updatedAt: {
        type: Date,
        label: 'Updated at',
        optional: true, // not sure about this, might not work when updating
        autoValue: function () {
            if (this.isUpdate) {
                return new Date();
            }
        }
    }
});

Places.attachSchema(PlacesSchema);

/**
 * publish all karaoke places from database
 * @return  {object}    mongodb cursor for all karaoke places
 */
Meteor.publish('places', () => {
    return Places.find();
});

/**
 * Publish current karaoke place data
 * @param   {string}    name    Karaoke place name
 * @return  {object}            current place object
 */
Meteor.publish('place', (name) => {
    return Places.findOne({name: name});
});

/**
 * Publish all songs beloging to current karaoke place
 * @param   {string}    placeName   Karaoke place name
 * @return  {object}                mongodb cursor for current karaoke place songs
 */
Meteor.publish('place.songs', (placeName) => {
    return Songs.find({places: placeName});
});
