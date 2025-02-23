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
		// Greetings
		"greetings": {
			keywords: ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "what's up?", "👋", "yo"],
			response: "Hello! I'm here to help you connect with Siby Augusty. How can I assist you today? 😊"
		},

		// Personal Background
		"about_me": {
			keywords: ["tell me about yourself", "background", "your story", "introduction", "who exactly are you?"],
			response: "Siby is a passionate Full Stack Developer from Kerala with nearly 3 years of experience crafting web solutions. He specializes in PHP ecosystems and loves turning complex problems into elegant digital solutions!"
		},

		// Technical Expertise
		"expertise": {
			keywords: ["what's your specialty?", "best at", "technical skills", "core competencies", "what stacks?"],
			response: "Siby's toolkit includes<br>• Backend: PHP/Laravel/Yii<br>• Frontend: React/JavaScrip<br>• Databases: MySQL/MongoD<br>• CMS: WordPres<br>He particularly excels in building RESTful APIs and scalable web architectures. 🚀"
		},

		// Service Offerings
		"offerings": {
			keywords: ["services", "what do you offer?", "can you build", "development services", "help me with"],
			response: "Siby provides:<br>✅ Custom Web Development<br>✅ API Integration<br>✅ WordPress Solutions<br>✅ Database Optimization<br>✅ Full-Stack Projects"
		},

		// Project Inquiry
		"portfolio": {
			keywords: ["see your work", "portfolio", "past projects", "github", "show me examples"],
			response: "Great choice! You can explore Siby's work here:<br><br>• Live Projects: https://sibyaugusty.github.io/myFolio<br>• Code Samples: https://github.com/sibyaugusty<br><br>Need specific case studies? Let me know your domain interest!"
		},

		// Business Inquiries
		"pricing": {
			keywords: ["rates", "pricing", "how much", "cost", "budget"],
			response: "Siby offers flexible engagement models:<br>• Project-based pricing<br>• Hourly rate<br>• Retainer agreement<br><br>For a detailed quote, could you share<br>1. Project scope<br>2. Timeline<br>3. Specific requirements?"
		},

		// Availability
		"availability": {
			keywords: ["are you available?", "timeline", "start date", "when can you begin?", "schedule"],
			response: "Siby currently has 🟢 availability for new projects starting next week. Would you prefer<br>1. Quick call this wee<br>2. Email briefin<br>3. Send project specs directly<br>Let me check his calendar!"
		},

		// Consultation
		"consultation": {
			keywords: ["talk to Siby", "meeting", "call", "zoom", "consult"],
			response: "Absolutely! Siby offers free 30-min consultations. Available slots<br>📅 Tue/Thu: 10 AM - 12 PM IS<br>Shall I send you a Calendly link? Or prefer email coordination?"
		},

		// Support
		"support": {
			keywords: ["help!", "urgent", "bug fix", "website down", "emergency"],
			response: "🚨 Let's get this resolved! Please share<br>1. Project nam<br>2. Error detail<br>3. Screenshot (if possible<br>Siby prioritizes support requests and typically responds within 2 hours."
		},

		// Work Process
		"process": {
			keywords: ["how you work", "development process", "workflow", "methodology"],
			response: "Siby follows agile methodology<br>1. Requirement Worksho<br>2. Prototypin<br>3. Sprint Developmen<br>4. QA Testin<br>5. Deploymen<br>Want me to share our complete process document?"
		},

		// Education
		"credentials": {
			keywords: ["education", "certifications", "qualifications", "degrees"],
			response: "Siby's credentials include<br>• B.Tech in Computer Scienc<br>• Diploma in Computer Engineerin<br>• Certified Laravel Develope<br>• Ongoing AWS Certificatio<br>Need specific certification details?"
		},
		// Contact Information
		"contact_info": {
			keywords: ["email", "phone number", "contact details", "how to reach you", "whatsapp", "direct line", "call you"],
			response: "For official inquiries:<br><br>📧 Email: contact@johnaugusty.com<br>📞 Phone: +91 XXX XXXX XXX (shared upon verified request)<br><br>To protect John's availability for current clients, would you prefer:<br>1. Schedule a call<br>2. Send project details via email<br>3. Receive our contact form link?",
		  },

		// Closing
		"goodbye": {
			keywords: ["bye", "thanks, goodbye", "later", "take care", "end chat"],
			response: "It was great assisting you! 💻 Remember, Siby is just an email away at contact@sibyaugusty.com. Have a productive day!"
		},

		// Default
		"default": {
			response: "Hmm, I might need Siby's input on that! Could you<br>1. Rephrase your questio<br>2. Email details to contact@sibyaugusty.co<br>3. Request a callback<br>I'm great with tech queries, project details, and scheduling!"
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

