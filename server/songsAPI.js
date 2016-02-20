/**
 * Created by mikedanylov on 2/20/16.
 */

Meteor.publish('theSongs', function() {
    return SongsList.find({});
});

Meteor.methods({
    insertSong: function(params) {
        SongsList.insert({
            name: params.name,
            artist: params.artist,
            duration: params.duration,
            places: params.places
        });
    },
    removeSong: function(id) {
        SongsList.remove({_id: id});
    },
    updateSongName: function(id, newName) {
        SongsList.update( { _id: params._id }, { name: newName } );
    },
    updateSongArtist: function(id, newArtist) {
        SongsList.update( { _id: params._id }, { artist: newArtist } );
    },
    updateSongDuration: function(id, newDuration) {
        SongsList.update( { _id: params._id }, { duration: newDuration } );
    },
    addSongPlace: function(id, newPlace) {
        SongsList.update( { _id: params._id }, { $push: { places: newPlace } } );
    },
    removeSongPlace: function(id, place) {
        SongsList.update( { _id: params._id }, { $pull: { places: place } } );
    }
});
