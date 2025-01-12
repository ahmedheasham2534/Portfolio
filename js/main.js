;(function () {
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (
                isMobile.Android() || 
                isMobile.BlackBerry() || 
                isMobile.iOS() || 
                isMobile.Opera() || 
                isMobile.Windows()
            );
        }
    };

    var fullHeight = function() {
        if (!isMobile.any()) {
            $('.js-fullheight').css('height', $(window).height());
            $(window).resize(function(){
                $('.js-fullheight').css('height', $(window).height());
            });
        }
    };

    // Add playsinline attribute for iOS devices
    var addPlaysinlineForiOS = function() {
        if (isMobile.iOS()) {
            const videos = document.querySelectorAll('video');
            videos.forEach(video => {
                video.setAttribute('playsinline', '');
            });
        }
    };

    // Call functions on document ready
    $(function() {
        fullHeight();
        addPlaysinlineForiOS();
    });
})();


	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};


	var counterWayPoint = function() {
		if ($('#colorlib-counter').length > 0 ) {
			$('#colorlib-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	// Animations
	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated');
							} else {
								el.addClass('fadeInUp animated');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var burgerMenu = function() {

		$('.js-colorlib-nav-toggle').on('click', function(event){
			event.preventDefault();
			var $this = $(this);

			if ($('body').hasClass('offcanvas')) {
				$this.removeClass('active');
				$('body').removeClass('offcanvas');	
			} else {
				$this.addClass('active');
				$('body').addClass('offcanvas');	
			}
		});



	};

	// Click outside of offcanvass
	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#colorlib-aside, .js-colorlib-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-colorlib-nav-toggle').removeClass('active');
			
	    	}
	    	
	    }
		});

		$(window).scroll(function(){
			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-colorlib-nav-toggle').removeClass('active');
			
	    	}
		});

	};

	var clickMenu = function() {

		$('#navbar a:not([class="external"])').click(function(event){
			var section = $(this).data('nav-section'),
				navbar = $('#navbar');

				if ( $('[data-section="' + section + '"]').length ) {
			    	$('html, body').animate({
			        	scrollTop: $('[data-section="' + section + '"]').offset().top - 55
			    	}, 500);
			   }

		    if ( navbar.is(':visible')) {
		    	navbar.removeClass('in');
		    	navbar.attr('aria-expanded', 'false');
		    	$('.js-colorlib-nav-toggle').removeClass('active');
		    }

		    event.preventDefault();
		    return false;
		});


	};

	// Reflect scrolling in navigation
	var navActive = function(section) {

		var $el = $('#navbar > ul');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};






	var sliderMain = function() {
		
	  	$('#colorlib-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	};

	var stickyFunction = function() {

		var h = $('.image-content').outerHeight();

		if ($(window).width() <= 992 ) {
			$("#sticky_item").trigger("sticky_kit:detach");
		} else {
			$('.sticky-parent').removeClass('stick-detach');
			$("#sticky_item").trigger("sticky_kit:detach");
			$("#sticky_item").trigger("sticky_kit:unstick");
		}

		$(window).resize(function(){
			var h = $('.image-content').outerHeight();
			$('.sticky-parent').css('height', h);


			if ($(window).width() <= 992 ) {
				$("#sticky_item").trigger("sticky_kit:detach");
			} else {
				$('.sticky-parent').removeClass('stick-detach');
				$("#sticky_item").trigger("sticky_kit:detach");
				$("#sticky_item").trigger("sticky_kit:unstick");

				$("#sticky_item").stick_in_parent();
			}
		});

		$('.sticky-parent').css('height', h);

		$("#sticky_item").stick_in_parent();

	};

	var owlCrouselFeatureSlide = function() {
		$('.owl-carousel').owlCarousel({
			animateOut: 'fadeOut',
		   animateIn: 'fadeIn',
		   autoplay: true,
		   loop:true,
		   margin:0,
		   nav:true,
		   dots: false,
		   autoHeight: true,
		   items: 1,
		   navText: [
		      "<i class='icon-arrow-left3 owl-direction'></i>",
		      "<i class='icon-arrow-right3 owl-direction'></i>"
	     	]
		})
	};

	// Document on load.
	$(function(){
		fullHeight();
		counter();
		counterWayPoint();
		contentWayPoint();
		burgerMenu();

		clickMenu();
		// navActive();
		navigationSection();
		// windowScroll();


		mobileMenuOutsideClick();
		sliderMain();
		stickyFunction();
		owlCrouselFeatureSlide();
	});


}());

// copy the link code
document.addEventListener("DOMContentLoaded", () => {
	const likeButtons = document.querySelectorAll(".copy-like-link");
  
	likeButtons.forEach((button, index) => {
	  const likeCountElement = button.querySelector(".like-count");
	  const likeIcon = button.querySelector(".fa-thumbs-up");
  
	  // Load the like count from localStorage
	  const savedLikeCount = localStorage.getItem(`like-count-${index}`);
  
	  if (savedLikeCount) {
		likeCountElement.textContent = savedLikeCount;
	  }
  
	  // Handle click event
	  button.addEventListener("click", () => {
		let currentCount = parseInt(likeCountElement.textContent, 10);
  
		// Increase like count
		likeCountElement.textContent = currentCount + 1;
  
		// Save the updated like count to localStorage
		localStorage.setItem(`like-count-${index}`, currentCount + 1);
  
		// Display notification
		showNotification("Thanks for liking!");
	  });
	});
  
	// Notification function
	const showNotification = (message) => {
	  const notification = document.createElement("div");
	  notification.classList.add("notification");
	  notification.textContent = message;
  
	  document.body.appendChild(notification);
  
	  setTimeout(() => {
		notification.remove();
	  }, 3000);
	};
  });
  
  

  
  // message bubbles
  const messages = [
	"Hello there, welcome to my website!",
	"My name is Ahmed Hisham.",
	"I'm a Front-End Developer and Certified Cloud Engineer.",
	"I've been crafting responsive websites for over 3 years.",
	"I specialize in HTML, CSS, JavaScript, and AWS solutions.",
	"Let me guide you through my portfolio in seconds."
  ];
  
  const messageBubble = document.querySelector(".message-bubble");
  const typingIndicator = document.querySelector(".typing-indicator");
  
  let messageIndex = 0;
  
  function showMessage() {
	if (messageIndex < messages.length) {
	  // Show typing indicator
	  typingIndicator.style.display = "flex";
	  messageBubble.style.opacity = 0;
  
	  setTimeout(() => {
		// Hide typing indicator
		typingIndicator.style.display = "none";
  
		// Display the message
		messageBubble.textContent = messages[messageIndex];
		messageBubble.style.opacity = 1;
		messageBubble.style.transform = "translateY(0)";
  
		messageIndex++;
		setTimeout(showMessage, 5000); // Display next message after 5 seconds
	  }, 2000); // Typing indicator delay
	} else {
	  // When all messages are done, scroll the website down by 100px
	  setTimeout(() => {
		window.scrollBy({
		  top: 400,
		  behavior: "smooth"
		});
	  }, 10); // Delay before scrolling
	}
  }
  
  // Start the sequence
  showMessage();
  
// social icons

// chat assistant 
const chatIcon = document.getElementById("chat-icon");
const chatWindow = document.getElementById("chat-window");
const closeChat = document.getElementById("close-chat");
const typingindicator = document.getElementById("typing-indicator");
const welcomeMessage = document.getElementById("welcome-message");
const buttonContainer = document.getElementById("button-container");
const profilesContainer = document.getElementById("profiles-container");
const contactBtn = document.getElementById("contact-btn");
const profilesBtn = document.getElementById("profiles-btn");

// Show chat window when icon is clicked
chatIcon.addEventListener("click", () => {
  chatWindow.classList.remove("hidden");

  // Typing effect
  typingindicator.classList.remove("hidden");

  setTimeout(() => {
    typingindicator.classList.add("hidden");
    welcomeMessage.classList.remove("hidden");

    // Show buttons after welcome message
    setTimeout(() => {
      buttonContainer.classList.remove("hidden");
    }, 1000);
  }, 1000);
});

// Close chat window
closeChat.addEventListener("click", () => {
  chatWindow.classList.add("hidden");
});

// "Contact Me" button action
contactBtn.addEventListener("click", () => {
  window.location.href = "mailto:ahmedheasham2534@gmail.com";
});

// "Show Profiles" button action
profilesBtn.addEventListener("click", () => {
  profilesContainer.classList.toggle("hidden");
});


