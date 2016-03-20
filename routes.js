/**
 * Created by mikedanylov on 3/18/16.
 */

Router.configure({
    layoutTemplate: 'main'
});
Router.route('/', {
    name: 'home',
    template: 'home',
    data: function() {
        return Meteor.user();
    }
});
Router.route('/register');
Router.route('/login');

Router.route('/places', {
    name: 'places'
});
Router.route('/places/add', {
    template: 'placeAdd'
});
Router.route('/places/:_id/show', {
    template: 'placeShow',
    data: function () {
        return Places.findOne({ _id: this.params._id})
    }
});
Router.route('/places/:_id/edit', {
    template: 'placeEdit',
    data: function () {
        return Places.findOne({ _id: this.params._id})
    }
});
Router.route('/places/:_id/songs', {
    template: 'placeSongs',
    data: function () {
        return {
            songs: Songs.find(),
            place: Places.findOne({ _id: this.params._id})
        }
    }
});

Router.route('/songs');
Router.route('/songs/add', {
    template: 'songAdd'
});
Router.route('/songs/:_id/show', {
    template: 'songShow',
    data: function () {
        return Songs.findOne({ _id: this.params._id})
    }
});
Router.route('/songs/:_id/edit', {
    template: 'songEdit',
    data: function () {
        return Songs.findOne({ _id: this.params._id})
    }
});
