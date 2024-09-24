document.addEventListener('DOMContentLoaded', function () {
    const reviewsCarousel = document.querySelector('.reviews'),
        reviewContainer = document.querySelector('.review_container'),
        reviews = [...document.querySelectorAll('.review')],
        animInterval = 3000,
        fadeDuration = 700;
    let currentReview = 0,
        slideReviewsIntervalID = null;

    // Create markers
    function createMarkers() {
        const markerContainer = document.createElement('div');
        markerContainer.classList.add('markers');
        for (let i = 0; i < reviews.length; i++) {
            const marker = document.createElement('div');
            marker.classList.add('marker');
            if (i === 0) marker.classList.add('marker_active');
            marker.dataset.index = i;
            marker.addEventListener('click', function () {
                slideReviews(i);
            });
            markerContainer.appendChild(marker);
        }
        reviewsCarousel.appendChild(markerContainer);
    }

    // Set Review's min-height
    function setMinHeight() {
        let maxHeight = 0;
        reviews.forEach(review => {
            const height = review.offsetHeight;
            if (height > maxHeight) maxHeight = height;
        });
        reviewContainer.style.minHeight = `${maxHeight}px`;
    }

    // Update active marker
    function updateMarkers() {
        const markers = [...document.querySelectorAll('.marker')];
        markers.forEach(marker => marker.classList.remove('marker_active'));
        markers[currentReview].classList.add('marker_active');
    }

    // Slide or Show_selected Reviews
    function slideReviews(index = null) {
        reviews[currentReview].classList.remove('review_active');
        setTimeout(function () {
            reviews[currentReview].style.display = 'none';

            if (index !== null) { // Show selected Review
                currentReview = index;
                // console.log('show');
            } else { // Auto slide Reviews
                currentReview = (currentReview + 1) % reviews.length;
                // console.log('sliding');
            }

            reviews[currentReview].style.display = 'block';
            setTimeout(function () {
                reviews[currentReview].classList.add('review_active');
                updateMarkers();
            }, 100);
        }, fadeDuration);
    }

    // Display only current review
    reviews.forEach((review, index) => {
        if (index !== currentReview) review.style.display = 'none';
    });

    // Start sliding & etc
    reviews[currentReview].classList.add('review_active');
    setMinHeight();
    createMarkers();
    window.addEventListener('resize', setMinHeight);

    // Observer for auto start-stop sliding Reviews
    const observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {    // Process only the first entry
            // Stop auto slider
            reviewsCarousel.addEventListener('mouseenter', function () {
                if (slideReviewsIntervalID) {
                    clearInterval(slideReviewsIntervalID);
                    slideReviewsIntervalID = null;
                    // console.log('stopped');
                }
            });
            reviewContainer.addEventListener('touchstart', function () {
                if (slideReviewsIntervalID) {
                    clearInterval(slideReviewsIntervalID);
                    slideReviewsIntervalID = null;
                    // console.log('stopped');
                }
            });
    
            // Start auto slider
            reviewsCarousel.addEventListener('mouseleave', function () {
                if (!slideReviewsIntervalID) {
                    slideReviewsIntervalID = setInterval(slideReviews, animInterval);
                    // console.log('started');
                }
            });
            reviewsCarousel.addEventListener('touchend', function () {
                if (!slideReviewsIntervalID) {
                    slideReviewsIntervalID = setInterval(slideReviews, animInterval);
                    // console.log('started');
                }
            });

            // Auto start when return to view
            if (!slideReviewsIntervalID) {
                slideReviewsIntervalID = setInterval(slideReviews, animInterval);
                // console.log('in view');
            }
        } else {
            clearInterval(slideReviewsIntervalID);
            slideReviewsIntervalID = null;
            // console.log('out of view');
        }
    });
    observer.observe(reviewsCarousel);
});