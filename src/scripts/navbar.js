/*!
GIS Project 2018
Group 1: Pessina Edoardo, Stucchi Lorenzo, Vestgaard Mathias
 */

/**
 * This function is called once all the DOM elements are ready to be used.
 */
$(function () {

    // Use strict mode to "secure" the script from syntax errors
    "use strict";

    var navBarToggler = $('.navbar-toggler');
    var navMenu       = $('.nav-menu');
    var isNavBarOpen  = false;

    /**
     * This function toggles the class <i>menu-is-open</i> on the navbar if the hamburger that
     * controls the collapsing of it is clicked.
     */
    navBarToggler.click(function () {
        if (isNavBarOpen)
            navMenu.removeClass('menu-is-open');
        else
            navMenu.addClass('menu-is-open');

        isNavBarOpen = !isNavBarOpen;
    });

    /**
     * This function toggles the class <i>is-scrolling</i> on the navbar if the page is scrolled.
     */
    function menuScroll() {
        var navMenu = $('.nav-menu');

        if ($(window).scrollTop() > 50) {
            navMenu.addClass('is-scrolling');
        } else {
            navMenu.removeClass("is-scrolling");
        }
    }

    menuScroll();

    $(window).on('scroll', function () {
        menuScroll();
    });

});