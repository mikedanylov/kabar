
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
        optional: true,
        defaultValue: 0,
        min: 0
    },
    duration: {
        type: String,
        label: 'Song duration'
    },
    places: {
        type: [String],
        label: 'Karaoke places'
    },
    createdAt: {
        type: Date,
        label: 'Created at',
        defaultValue: new Date()
        // autoValue: function () {
        //     if (this.isInsert) {
        //         return new Date();
        //     }
        // }
    },
    updatedAt: {
        type: Date,
        label: 'Updated at',
        optional: true, // not sure about this, might not work when updating
        defaultValue: new Date()
        // autoValue: function () {
        //     if (this.isUpdate) {
        //         return new Date();
        //     }
        // }
    }
});

Songs.attachSchema(SongsListSchema);

Meteor.methods({
    'songs.add'(songName, songArtist, songDuration, karaokePlace) {
        new SimpleSchema({
            songName: {type: String, label: 'The name of new song'},
            songArtist: {type: String, label: 'The artist of new song'},
            songDuration: {type: String, label: 'New song duration'},
            karaokePlace: {type: String, label: 'Karaoke bar where song is going to be offered'}
        }).validate({songName, songArtist, songDuration, karaokePlace});

        var cur = Songs.insert({
            name: songName,
            artist: songArtist,
            popularity: 0,
            duration: songDuration,
            places: [karaokePlace]
        });
        console.log('Meteor::methods::songs.add: new song added with id ' + cur);
        return cur;
    },
    'songs.update'(songId, songName, songArtist, songDuration) {
        new SimpleSchema({
            songName: {type: String, label: 'The name of new song'},
            songArtist: {type: String, label: 'The artist of new song'},
            songDuration: {type: String, label: 'New song duration'}
        }).validate({songName, songArtist, songDuration});

        var cur = Songs.update({ _id: songId }, {
            $set: {
                name: songName,
                artist: songArtist,
                duration: songDuration,
                updatedAt: new Date()
            }
        });
        console.log('Meteor::methods::songs.update: song succesfully updated ' + cur);
        return cur;
    }
});

/**
 * Publish all songs from database
 * @return  {object}    mongodb cursor for all songs
 */
Meteor.publish('songs', function () {
    return Songs.find();
});

