/**
 * This function is called once all the DOM elements are ready to be used.
 */
$(function () {

    // Use strict mode to "secure" the script from syntax errors
    "use strict";

    //----------------------------------------------------------------------------------------------
    // NAVBAR
    //----------------------------------------------------------------------------------------------

    var navBar = $('#navbar');

    navBar.on('show.bs.collapse', function (e) {
        $(this).parents('.nav-menu').addClass('menu-is-open');
    });

    navBar.on('hide.bs.collapse', function (e) {
        $(this).parents('.nav-menu').removeClass('menu-is-open');
    });

    /**
     * This function toggles the class <i>is-scrolling</i> if the page is scrolled.
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


    //----------------------------------------------------------------------------------------------
    // LOADER
    //----------------------------------------------------------------------------------------------
    // $(window).on("load", function () {
    //     $('.loader').fadeOut(500);
    //     // setTimeout($('.loader').fadeOut(500), 3000);
    // });

});