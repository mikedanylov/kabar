
import { getUserName } from './../../globals';
import { changeHamburger } from './../../globals';
import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

Template.home.helpers({
    username: () =>  {
        return getUserName(Meteor.user());
    }
});

Template.credentials.events({
    'click .cancel': function(event) {
        Router.go('home');
    },
    'click .btn-facebook': function(event) {
        Meteor.loginWithFacebook({}, function(err){
            if (err && err.length) {
                console.log(err.reason);
                throw new Meteor.Error("Facebook login failed");
            } else {
                Router.go('home');
            }
        });
    }
});
Template.signup.events({
    'submit form': function(event) {
        event.preventDefault();
    }
});
Template.signup.onRendered(() => {
    var validator = $('.signup-form').validate({
        submitHandler: function(event) {
            var username = document.querySelector('[name=username]').value;
            var email = document.querySelector('[name=email]').value;
            var pwd = document.querySelector('[name=password]').value;
            Accounts.createUser({
                username: username,
                email: email,
                password: pwd,
                admin: false
            }, function errorHandling(error){
                if (error) {
                    console.log('Signup ation Failed: ' + error.reason);
                    if(error.reason == "Email already exists."){
                        validator.showErrors({
                            email: "That email already belongs to a registered user."
                        });
                    }
                    return;
                }
                Router.go('home');
            });
        }
    });
});

Template.signin.events({
    'submit form': function(event) {
        event.preventDefault();
    }
});
Template.signin.onRendered(() => {
    var validator = $('.signin-form').validate({
        submitHandler: function(event) {
            var email = document.querySelector('[name=email]').value;
            var pwd = document.querySelector('[name=password]').value;
            Meteor.loginWithPassword( email, pwd, function errorHandling(error) {
                if (error) {
                    console.log('signin Failed: ' + error.reason);
                    if(error.reason == "User not found"){
                        validator.showErrors({
                            email: "User not found"
                        });
                    } else if (error.reason == "Incorrect password"){
                        validator.showErrors({
                            password: "Incorrect password"
                        });
                    } else if (error.reason == "User has no password set") {
                        validator.showErrors({
                            email: "User has no password set"
                        });
                    }
                    return;
                }
                if (Router.current().route.getName() === 'signin') {
                    Router.go('home');
                } else {
                    Router.go(Router.current().route.getName());
                }
            });
        }
    });
});

Template.navigation.events({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        var currentRoute = Router.current().route.getName();
        if (currentRoute === 'placeKaraoke' || currentRoute === 'placeEdit') {
            Router.go('home');
        } else {
            Router.go(currentRoute);
        }
    },
    'click #nav-toggle': function(event) {
        var hamburger = $('#nav-toggle');
        setTimeout(changeHamburger, 50);

    },
    'click #nav-search-open': function(event) {
        $('#search-inactive').hide('slow');
        $('#search-active').show('slow');
    },
    'click #nav-search-close': function(event) {
        $('#search-inactive').show('slow');
        $('#search-active').hide('slow');
    },
    'click .nav-link': function (event) {
        $('#menu').collapse('hide');
        setTimeout(changeHamburger,50);

    }
});

Template.main.events({
    'click #noNav': function (event) {
        if (window.innerWidth < 768) {
            $('#menu').collapse('hide');
            setTimeout(changeHamburger, 50);
        }

    }
});

Template.home.onRendered(() => {
    $("#home-link").addClass("active");
});
Template.home.onDestroyed(() => {
    $("#home-link").removeClass("active");
});
Template.signin.onRendered(() => {
    $("#signin-link").addClass("active");
    $(".signin-heading").addClass("underscore-orange");
});
Template.signin.onDestroyed(() => {
    $("#signin-link").removeClass("active");
});
Template.signup.onRendered(() => {
    $("#signup-link").addClass("active");
    $(".signup-heading").addClass("underscore-orange");
});
Template.signup.onDestroyed(() => {
    $("#signup-link").removeClass("active");
});
Template.navigation.onRendered(() => {
    $("#search-active").hide();
});