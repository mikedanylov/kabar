/**
 * Created by mikedanylov on 4/16/16.
 */

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import '/imports/ui/signup/signin.html';
import '/imports/ui/signup/signup.html';
import '/imports/ui/signup/credentials.html';
import '/imports/ui/signup/headerButtons.html';

import '/imports/ui/signup/signup.css';

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
                    } else if(error.reason == "Username already exists."){
                        validator.showErrors({
                            username: "That username already belongs to a registered user."
                        });
                    }
                    return;
                }
                Router.go('home');
            });
        }
    });
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

Template.signin.onRendered(() => {
    $(".signin-link").addClass("active");
    $(".signin-heading span").addClass("underscore-orange");
});
Template.signin.onDestroyed(() => {
    $(".signin-link").removeClass("active");
});
Template.signup.onRendered(() => {
    $(".signup-link").addClass("active");
    $(".signup-heading span").addClass("underscore-orange");
});
Template.signup.onDestroyed(() => {
    $(".signup-link").removeClass("active");
});