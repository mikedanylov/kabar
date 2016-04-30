/**
 * Created by mikedanylov on 4/3/16.
 */

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'

export function getUserName(user) {
    if (user) {
        return user.hasOwnProperty('profile') ? user.profile.name : user.username;
    }
}

export function changeHamburger() {
    var hamburger = $('#nav-toggle'),
        menu = $('#menu');
    if ($(menu).attr('aria-expanded') &&
        $(menu).attr('aria-expanded') === 'true') {
        $(hamburger).addClass('active');
    } else {
        $(hamburger).removeClass('active');
    }
}

Template.registerHelper('isAdmin', function(adminsList) {
    return !!(Meteor.user() && adminsList.indexOf(Meteor.user().username) >= 0);
});

Template.registerHelper('isKabarAdmin', function() {
    return !!(Meteor.user() && Meteor.user().username === 'kabaradmin');
});

// Template.registerHelper('songs', function() {
//     console.log(this);
//     return Songs.find({places: this.place.name});
// });

Template.registerHelper('addOneTo', function(index) {
    return index + 1;
});

// default rules for form validation
$.validator.setDefaults({
    rules: {
        username: {
            required: true
        },
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 4
        }
    },
    messages: {
        username: {
            required: 'You need to have a name'
        },
        email: {
            required: 'Email field is required',
            email: 'That is not a correct email'
        },
        password: {
            required: 'Password field is required',
            minlength: 'Password should be at least {0} characters'
        }
    }
});