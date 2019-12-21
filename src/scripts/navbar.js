import $ from "jquery"


export default function () {

    const navBarToggler = $(".navbar-toggler"),
          navbar        = $("#navbar");

    let isNavBarOpen = false;


    navBarToggler.click(() => {

        if (isNavBarOpen) navbar.removeClass("show");

        else navbar.addClass("show");

        isNavBarOpen = !isNavBarOpen;

    });


    // menuScroll(navbar);
    //
    // $(window).on("scroll", () => menuScroll(navbar));

}


// function menuScroll(navMenu) {
//
//     if ($(window).scrollTop() > 50) navMenu.addClass('is-scrolling');
//
//     else navMenu.removeClass("is-scrolling");
//
// }
