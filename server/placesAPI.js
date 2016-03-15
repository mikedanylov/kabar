/**
 * Created by mikedanylov on 2/20/16.
 */

Meteor.publish('Places', function() {
    return Places.find({});
});

Meteor.methods({
    insertPlace: function(params) {
        Places.insert({
            name: params.name,
            address: params.address,
            location: params.location
        });
    },
    removePLace: function(id) {
        Places.remove({_id: id});
    },
    updatePlacesName: function(id, newName) {
        Places.update( { _id: params._id }, { name: newName } );
    },
    updatePlacesAddress: function(id, newAddress) {
        Places.update( { _id: params._id }, { address: newAddress } );
    }
});
