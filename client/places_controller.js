/**
 * Created by mikedanylov on 2/20/16.
 */

Template.placesList.helpers({
    place: function() {
        return Places.find();
    }
});
