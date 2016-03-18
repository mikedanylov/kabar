/**
 * Created by mikedanylov on 2/20/16.
 */

Meteor.publish('theSongs', function() {
    return Songs.find({});
});

Meteor.methods({
    insertSong: function(params) {
        Songs.insert({
            name: params.name,
            artist: params.artist,
            duration: params.duration,
            places: params.places
        });
    },
    removeSong: function(id) {
        Songs.remove({_id: id});
    },
    updateSongName: function(id, newName) {
        Songs.update( { _id: params._id }, { name: newName } );
    },
    updateSongArtist: function(id, newArtist) {
        Songs.update( { _id: params._id }, { artist: newArtist } );
    },
    updateSongDuration: function(id, newDuration) {
        Songs.update( { _id: params._id }, { duration: newDuration } );
    },
    addSongPlace: function(id, newPlace) {
        Songs.update( { _id: params._id }, { $push: { places: newPlace } } );
    },
    removeSongPlace: function(id, place) {
        Songs.update( { _id: params._id }, { $pull: { places: place } } );
    }
});
