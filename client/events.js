/**
 * Created by mikedanylov on 2/20/16.
 */

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
        var answer = confirm("Are you 100% sure you want to remove your karaoke place?");
        if (answer) {
            Places.remove(this._id);
        }
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

Template.songShow.events({
    'click .place-order': function(event) {
        event.preventDefault(); // don't refresh page
        var song = Songs.findOne({_id: document.querySelector('#song-id').innerHTML});
        var place = Places.findOne({name: this.valueOf()});

        Orders.insert({
            username: Meteor.user().username,
            song: song._id,
            place: place._id
        }, function(error, results) {
            if (error) {
                console.log(error);
                return;
            }
            console.log(results);
            //Router.go('placeKaraoke');
        });
    }
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
            required: 'Enter email to login',
            email: 'That is not a correct email'
        },
        password: {
            required: 'Password field is required',
            minlength: 'Password should be at least {0} characters'
        }
    }
});

Template.songs.events({
    'click .remove': function(event) {
        Songs.remove(this._id);
    }
});

Template.signup.events({
    'submit form': function(event) {
        event.preventDefault();
    }
});
Template.signup.onRendered(function(){
    $('.signup').validate({
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

Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
    }
});
Template.login.onRendered(function(){
    $('.login').validate({
        submitHandler: function(event) {
            var email = document.querySelector('[name=email]').value;
            var pwd = document.querySelector('[name=password]').value;
            Meteor.loginWithPassword( email, pwd, function errorHandling(error) {
                if (error) {
                    console.log('Login Failed: ' + error.reason);
                    if(error.reason == "User not found"){
                        validator.showErrors({
                            email: error.reason
                        });
                    } else if (error.reason == "Incorrect password"){
                        validator.showErrors({
                            password: error.reason
                        });
                    }
                    return;
                }
                if (Router.current().route.getName() === 'login') {
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
        Router.go(Router.current().route.getName());
    }
});
