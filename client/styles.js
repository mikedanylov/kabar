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
Template.signin.rendered = function() {
    $("#signin-link").addClass("active");
    $(".signin-heading").addClass("underscore-orange");
};
Template.signin.destroyed = function() {
    $("#signin-link").removeClass("active");
};
Template.signup.rendered = function() {
    $("#signup-link").addClass("active");
    $(".signup-heading").addClass("underscore-orange");
};
Template.signup.destroyed = function() {
    $("#signup-link").removeClass("active");
};
Template.navigation.rendered = function() {
    $("#search-active").hide();
};