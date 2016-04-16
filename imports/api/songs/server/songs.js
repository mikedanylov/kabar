
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Songs = new Mongo.Collection('songs');

// db for songslist collection
SongsListSchema = new SimpleSchema({
    name: {
        type: String,
        label: 'Name',
        max: 64
    },
    artist: {
        type: String,
        label: 'Artist',
        max: 64
    },
    popularity: {
        type: Number,
        label: 'Reservation counter',
        defaultValue: 0,
        min: 0
    },
    duration: {
        type: String,
        label: 'Song duration'
    },
    places: {
        type: [String],
        optional: true,
        label: 'Karaoke places'
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

Songs.attachSchema(SongsListSchema);

Meteor.methods({
    'getAllSongs': () => {
        let allSongs = Songs.find();
        console.log('Meteor::methods::songs.getAll: ');
        //console.log(allSongs.fetch());
        return allSongs;
    }
});

/**
 * Publish all songs from database
 * @return  {object}    mongodb cursor for all songs
 */
Meteor.publish('songs', () => {
    let songs = Songs.find();
    if (songs) {
        return songs;
    }
});

