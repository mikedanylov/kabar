/**
 * Created by mikedanylov on 2/20/16.
 */

Template.songsList.helpers({
    song: function() {
        return SongsList.find();
    }
});

 Template.songsList.events({

 });
