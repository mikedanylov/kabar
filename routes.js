/**
 * Created by mikedanylov on 3/18/16.
 */

Router.configure({
    layoutTemplate: 'main'
});
Router.route('/', {
    name: 'home',
    template: 'home'
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

Router.route('/songs');
Router.route('/songs/add', {
    name: 'add-song',
    template: 'add-song'
});
Router.route('/songs/:_id/show', {
    name: 'show-song',
    template: 'show-song'
});
Router.route('/songs/:_id/edit', {
    name: 'edit-song',
    template: 'edit-song'
});
