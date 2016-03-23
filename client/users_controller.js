/**
 * Created by mikedanylov on 3/19/16.
 */
Template.register.events({
   'submit form': function(event) {
       event.preventDefault();
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
               console.log('Registration Failed: ' + error.reason);
           }
       });
       Router.go('home');
   }
});

Template.login.events({
    'submit form': function(event) {
        event.preventDefault();
        var email = document.querySelector('[name=email]').value;
        var pwd = document.querySelector('[name=password]').value;
        Meteor.loginWithPassword( email, pwd, function errorHandling(error) {
            if (error) {
                console.log('Login Failed: ' + error.reason);
                return;
            }
            Router.go('home');
        });

    }
});

Template.navigation.events({
    'click .logout': function(event) {
        event.preventDefault();
        Meteor.logout();
        Router.go('home');
    }
});