Template.songsList.rendered = function() {
    console.log(this);
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
    console.log(this);
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
