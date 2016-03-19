/**
 * Created by mikedanylov on 2/20/16.
 */

Template.songsList.helpers({
    song: function() {
        return Songs.find();
    }
});

Template.songAdd.events({
    'submit form': function(event) {
        event.preventDefault(); // don't refresh page
        Songs.insert({
            name: document.querySelector('[name=name]').value,
            artist: document.querySelector('[name=artist]').value,
            duration: document.querySelector('[name=duration]').value
        }, function(error, results) {
            if (error) {
                console.log(error);
                return;
            }
            console.log(results);
            Router.go('songs');
        });
    }
});

Template.songEdit.events({
    'submit form': function(event) {
        event.preventDefault(); // don't refresh page
        Songs.update(this._id, {
            $set: {
                name: document.querySelector('[name=name]').value,
                artist: document.querySelector('[name=artist]').value,
                duration: document.querySelector('[name=duration]').value
            }
        }, function(error, results) {
            if (error) {
                console.log(error);
                return;
            }
            console.log(results);
            Router.go('songs');
        });
    }
});

Template.songs.events({
    'click .remove': function(event) {
        Songs.remove(this._id, function(error, results) {
           if (error) {
               console.log(error);
               return;
           }
            Router.go('songs');
        });
    }
});
