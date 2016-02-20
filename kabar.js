if (Meteor.isClient) {

    Template.songsList.helpers({
        song: function() {
            return SongsList.find();
        }
    });

    // Template.songsList.events({

    // });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
