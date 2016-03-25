Template.navigation.rendered = function() {
    document.querySelector( "#nav-toggle" )
        .addEventListener( "click", function() {
            this.classList.toggle("active");
        });
    $("#nav-toggle").blur(function (event) {
        var screenWidth = window.innerWidth;
        if (screenWidth < 768) {
            $("#menu").collapse('hide');
            $("#nav-toggle").removeClass("active");
        }
    });
};

Template.songsList.rendered = function() {
    $("#songs-link").addClass("active");
};
Template.songsList.destroyed = function() {
    $("#songs-link").removeClass("active");
};
Template.home.rendered = function() {
    $("#home-link").addClass("active");
};
Template.home.destroyed = function() {
    $("#home-link").removeClass("active");
};
Template.placesList.rendered = function() {
    $("#places-link").addClass("active");
};
Template.placesList.destroyed = function() {
    $("#places-link").removeClass("active");
};
Template.login.rendered = function() {
    $("#login-link").addClass("active");
};
Template.login.destroyed = function() {
    $("#login-link").removeClass("active");
};
