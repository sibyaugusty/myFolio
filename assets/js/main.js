$(document).ready(function () {

    $(".language-slider").slick({
        infinite: true,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 2500,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    });

    function applyScrollReveal() {
        if ($(window).width() < 576) {
            $(".project").addClass("scroll-reveal");
            $(".projects-grid").removeClass("scroll-reveal");
            $(".button-container").addClass("scroll-reveal");
        } else {
            $(".projects-grid").addClass("scroll-reveal");
            $(".project").removeClass("scroll-reveal");
        }
    }

    // Apply scroll reveal on page load
    applyScrollReveal();

    // Re-evaluate on window resize
    $(window).resize(applyScrollReveal);
    //expanding header for responsive devices
    $(".menu-icon").click(function () {
        $("nav ul").toggleClass("active-menu");
    });


    // scroll slide up animation
    ScrollReveal().reveal(".scroll-reveal", {
        delay: 200,
        distance: "80px",
        origin: "bottom",
        duration: 1000,
        easing: "cubic-bezier(0.5, 0, 0, 1)",
        reset: true,
    });

    //scroll header animation
    $(window).scroll(function () {
        if ($(window).scrollTop()) {
            $("header").addClass("shrink");
            $(".logo").addClass("shrink");
        } else {
            $("header").removeClass("shrink");
            $(".logo").removeClass("shrink");
        }
    });

    var professions = ["Full-Stack Developer", "Web Developer", "Software Engineer", "Front-End Developer"];
    var currentIndex = 0;
    var currentCharIndex = 0;
    var element = $("#profession");

    function typeEffect() {
        if (currentCharIndex < professions[currentIndex].length) {
            element.text(element.text() + professions[currentIndex][currentCharIndex++]);
            setTimeout(typeEffect, 100); // Typing speed in milliseconds
        } else {
            setTimeout(deleteEffect, 2000); // Wait for 2 seconds before starting to delete
        }
    }

    function deleteEffect() {
        if (currentCharIndex > 0) {
            element.text(element.text().slice(0, --currentCharIndex));
            setTimeout(deleteEffect, 50); // Deleting speed in milliseconds
        } else {
            currentIndex = (currentIndex + 1) % professions.length;
            setTimeout(typeEffect, 200); // Wait for a little before starting next title
        }
    }

    typeEffect();
});
