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