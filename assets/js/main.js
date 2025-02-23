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

//  Technical Skills Animation

document.addEventListener('DOMContentLoaded', function () {
	// Initialize skill sections
	const navItems = document.querySelectorAll('.nav-item');
	const skillSections = document.querySelectorAll('.skill-section');

	// Tab switching functionality
	navItems.forEach(item => {
		item.addEventListener('click', () => {
			const targetSection = item.dataset.section;

			// Update active states
			navItems.forEach(nav => nav.classList.remove('active'));
			skillSections.forEach(section => section.classList.remove('active'));

			item.classList.add('active');
			document.getElementById(targetSection).classList.add('active');

			// Animate progress bars
			animateProgressBars(document.getElementById(targetSection));
		});
	});

	// Progress bar animation
	function animateProgressBars(section) {
		const progressBars = section.querySelectorAll('.progress');
		const percentageTexts = section.querySelectorAll('.percentage');

		progressBars.forEach((bar, index) => {
			const targetValue = bar.dataset.value;
			bar.style.width = '0%';
			percentageTexts[index].textContent = '0%';

			setTimeout(() => {
				bar.style.width = targetValue + '%';

				let startValue = 0;
				const duration = 1500;
				const increment = (targetValue / duration) * 10;

				const updateNumber = () => {
					if (startValue < targetValue) {
						startValue += increment;
						if (startValue > targetValue) startValue = targetValue;
						percentageTexts[index].textContent = Math.round(startValue) + '%';
						requestAnimationFrame(updateNumber);
					}
				};

				updateNumber();
			}, 100);
		});
	}

	// Initialize first section
	animateProgressBars(document.querySelector('.skill-section.active'));
});

// Chat Bot Functionality
$(document).ready(function () {
	const $chatIcon = $('#chatIcon');
	const $chatContainer = $('#chatContainer');
	const $closeBtn = $('#closeChat');
	const $messages = $('#chatMessages');
	const $userInput = $('#userInput');

	// Toggle Chat
	$chatIcon.on('click', function () {
		if (!$chatContainer.hasClass('active')) {
			$chatContainer.addClass('active');
			$userInput.focus();
		}
	});

	// Close Chat
	$closeBtn.on('click', function () {
		$chatContainer.removeClass('active');
	});

	// Close when clicking outside
	$(document).on('click', function (e) {
		if (!$(e.target).closest('.chat-container').length &&
			!$(e.target).is('#chatIcon')) {
			$chatContainer.removeClass('active');
		}
	});

	// Chat Content
	const contentDatabase = {
		"greetings": {
			keywords: ["hi", "hello", "hey", "greetings"],
			response: "Hey there! I'm Siby's assistant. How can I help you today?"
		},
		"how_are_you": {
			keywords: ["how are you", "how's it going", "how do you do"],
			response: "I'm doing great! Thanks for asking. How can I help you?"
		},
		"who_are_you": {
			keywords: ["who are you", "introduce yourself", "what's your name", "Your name"],
			response: "I'm Siby Augusty, a Full Stack PHP Web Developer from Kerala, India. I specialize in building dynamic and responsive web applications."
		},
		"profession": {
			keywords: ["what do you do", "profession", "occupation", "job"],
			response: "I'm a Full Stack PHP Web Developer with expertise in building dynamic and responsive web applications."
		},
		"experience": {
			keywords: ["experience", "years", "background", "career"],
			response: "I have 2.8 years of experience in web development, working with PHP, JavaScript, and modern frameworks like React and Laravel."
		},
		"skills": {
			keywords: ["skills", "technologies", "stack", "tech"],
			response: "My core skills include PHP, JavaScript, React.js, Laravel, MySQL, and WordPress development."
		},
		"services": {
			keywords: ["services", "offer", "provide", "work"],
			response: "I offer web development, API development, WordPress customization, and database optimization services."
		},
		"database": {
			keywords: ["database", "data management", "SQL", "MongoDB"],
			response: "I have experience working with MySQL and MongoDB, optimizing queries, designing schemas, and managing databases efficiently."
		},
		"projects": {
			keywords: ["projects", "portfolio", "work examples", "past work"],
			response: "You can check out my projects on my GitHub: https://github.com/sibyaugusty and my portfolio: https://sibyaugusty.github.io/myFolio"
		},
		"frameworks": {
			keywords: ["frameworks", "tools", "development stack"],
			response: "I work with Laravel, Yii2, WordPress, Bootstrap, and Tailwind CSS for building modern and scalable web applications."
		},
		"version_control": {
			keywords: ["git", "github", "version control", "bitbucket"],
			response: "I use Git for version control and collaborate using GitHub and Bitbucket for code management."
		},
		"education": {
			keywords: ["education", "qualification", "degree"],
			response: "I hold a B.Tech in Computer Science from Universal Engineering College, Thrissur, and a Diploma in Computer Science from K K M Model Polytechnic College."
		},
		"location": {
			keywords: ["where are you from", "location", "city"],
			response: "I'm based in Thrissur, Kerala, India."
		},
		"goodbye": {
			keywords: ["bye", "goodbye", "see you", "take care"],
			response: "Goodbye! Have a great day. Feel free to reach out anytime."
		},
		"thanks": {
			keywords: ["thanks", "thank you", "appreciate"],
			response: "You're welcome! Let me know if there's anything else I can help with."
		},
		"default": {
			response: "I'm here to assist with any questions about my work, skills, and experience. Feel free to ask!"
		}
	};

	// Updated processing functions
	function processInput(text) {
		return text.toLowerCase()
			.replace(/[^\w\s]/gi, '')
			.replace(/\s+/g, ' ')
			.trim();
	}

	function findBestMatch(processedText) {
		let bestMatch = null;
		let highestScore = 0;

		// Check all phrases first for exact matches
		const phraseMatches = [];
		Object.entries(contentDatabase).forEach(([key, data]) => {
			if (key === "default") return;

			data.keywords.forEach(keyword => {
				if (processedText.includes(keyword)) {
					phraseMatches.push({ key, length: keyword.length });
				}
			});
		});

		// Prioritize longest matching phrase
		if (phraseMatches.length > 0) {
			const bestPhrase = phraseMatches.reduce((a, b) =>
				a.length > b.length ? a : b
			);
			return contentDatabase[bestPhrase.key];
		}

		// Fallback to word-based matching
		const words = processedText.split(/\s+/).filter(w => w.length > 2);

		Object.entries(contentDatabase).forEach(([key, data]) => {
			if (key === "default") return;

			const score = data.keywords.reduce((acc, keyword) => {
				const keywordWords = keyword.split(/\s+/);
				const matchCount = keywordWords.filter(kw =>
					words.includes(kw)
				).length;
				return acc + (matchCount / keywordWords.length);
			}, 0);

			if (score > highestScore) {
				highestScore = score;
				bestMatch = key;
			}
		});

		return highestScore > 0 ? contentDatabase[bestMatch] : contentDatabase.default;
	}

	function addMessage(text, isUser = true) {
		const messageClass = isUser ? 'user-message' : 'bot-message';
		$messages.append(`
            <div class="message ${messageClass}">
                ${text}
            </div>
        `);
		$messages.scrollTop($messages[0].scrollHeight);
	}

	// Send Message Handler
	function sendMessage() {
		const userText = $userInput.val().trim();
		if (!userText) return;

		addMessage(userText, true);
		$userInput.val('');

		const keywords = processInput(userText);
		const response = findBestMatch(keywords).response;
		setTimeout(() => addMessage(response, false), 500);
	}

	// Event Listeners
	$('#sendButton').on('click', sendMessage);
	$('#userInput').on('keypress', function (e) {
		if (e.which === 13) sendMessage();
	});
});

