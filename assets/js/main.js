$(document).ready(function () {
	setTimeout(function () {
		$(".carousel-container").addClass("active");
		$(".social-media").addClass("active");
	}, 4000);

	$(".language-slider").slick({
		infinite: true,
		cssEase: "linear",
		arrows: false,
		slidesToShow: 5,
		autoplay: true,
		autoplaySpeed: 0,
		speed: 2000,
		pauseOnHover: false,
		focusOnSelect: true,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					infinite: true,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 576,
				settings: {
					slidesToShow: 2,
				},
			},
		],
	});

	function applyScrollReveal() {
		if ($(window).width() < 576) {
			$(".project").addClass("scroll-reveal");
		} else {
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
			setTimeout(typeEffect, 100);
		} else {
			setTimeout(deleteEffect, 2000);
		}
	}

	function deleteEffect() {
		if (currentCharIndex > 0) {
			element.text(element.text().slice(0, --currentCharIndex));
			setTimeout(deleteEffect, 50);
		} else {
			currentIndex = (currentIndex + 1) % professions.length;
			setTimeout(typeEffect, 200);
		}
	}

	typeEffect();

	//   scroll reveal all option sample
	//   ScrollReveal().reveal(".example", {
	//     delay: 300, // Waits 300ms before starting
	//     distance: "100px", // Moves 100px from its origin
	//     origin: "top", // Starts from the top
	//     duration: 800, // Completes the animation in 800ms
	//     easing: "ease-in-out", // Smooth acceleration and deceleration
	//     reset: true, // Repeats animation when re-entering viewport
	//     viewFactor: 0.5, // Starts when 50% of element is visible
	//     scale: 0.85, // Shrinks element to 85% of its size, then grows
	//   });

	//about section
	var slideRight = {
		distance: window.innerWidth < 576 ? "40%" : "100%", // Adjust based on screen size
		origin: "left",
		duration: 1000,
		delay: 500,
		opacity: 0,
		easing: "ease-in-out",
	};
	var slideLeft = {
		distance: window.innerWidth < 576 ? "40%" : "100%", // Adjust based on screen size
		origin: "Right",
		duration: 1000,
		delay: 500,
		opacity: 0,
		easing: "ease-in-out",
	};

	ScrollReveal().reveal(".slide-right-reveal", slideRight);
	ScrollReveal().reveal(".slide-left-reveal", slideLeft);
	
});
