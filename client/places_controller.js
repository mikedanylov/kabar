/**
 * Created by mikedanylov on 2/20/16.
 */

Template.placesList.helpers({
    place: function() {
        return Places.find();
    }
});

Template.placeAdd.events({
    'submit form': function(event) {
        event.preventDefault(); // don't refresh page
        Places.insert({
            name: document.querySelector('[name=name]').value,
            address: document.querySelector('[name=address]').value,
            latitude: document.querySelector('[name=latitude]').value,
            longitude: document.querySelector('[name=longitude]').value
        }, function(error, results) {
            if (error) {
                console.log(error);
                return;
            }
            console.log(results);
            Router.go('places');
        });
    }
});

Template.placeEdit.events({
    'submit form': function(event) {
        event.preventDefault(); // don't refresh page
        Places.update(this._id, {
            $set: {
                name: document.querySelector('[name=name]').value,
                address: document.querySelector('[name=address]').value,
                latitude: document.querySelector('[name=latitude]').value,
                longitude: document.querySelector('[name=longitude]').value
            }
        }, function(error, results) {
            if (error) {
                console.log(error);
                return;
            }
            console.log(results);
            Router.go('places');
        });
    }
});

Template.places.events({
    'click .remove': function(event) {
        Places.remove(this._id, function(error, results) {
            if (error) {
                console.log(error);
                return;
            }
            Router.go('places');
        });
    }
});
