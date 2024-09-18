document.addEventListener('DOMContentLoaded', function () {
    const reviewsCarousel = document.querySelector('.reviews'),
        reviewContainer = document.querySelector('.review_container'),
        reviews = [...document.querySelectorAll('.review')],
        animInterval = 3000,
        fadeDuration = 700;
    let currentReview = 0,
        slideReviewsIntervalID;

    // Create markers
    function createMarkers() {
        const markerContainer = document.createElement('div');
        markerContainer.classList.add('markers');
        for (let i = 0; i < reviews.length; i++) {
            const marker = document.createElement('div');
            marker.classList.add('marker');
            if (i === 0) marker.classList.add('marker_active')
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
            if (height > maxHeight) {
                maxHeight = height;
            }
        });
        reviewContainer.style.minHeight = `${maxHeight}px`;
    }

    // Update active marker
    function updateMarkers() {
        const markers = document.querySelectorAll('.marker');
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
                console.log('show');
            } else { // Auto slide Reviews
                currentReview = (currentReview + 1) % reviews.length;
                console.log('sliding');
            }

            reviews[currentReview].style.display = 'block';
            setTimeout(function () {
                reviews[currentReview].classList.add('review_active');
                updateMarkers();
            }, 300);
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
    slideReviewsIntervalID = setInterval(slideReviews, animInterval);
    window.addEventListener('resize', setMinHeight);

    // Stop auto slider
    reviewsCarousel.addEventListener('mouseenter', function () {
        clearInterval(slideReviewsIntervalID);
        console.log('stopped');
    });
    reviewContainer.addEventListener('touchstart', function () {
        clearInterval(slideReviewsIntervalID);
        console.log('stopped');
    });

    // Start auto slider
    reviewsCarousel.addEventListener('mouseleave', function () {
        slideReviewsIntervalID = setInterval(slideReviews, animInterval);
        console.log('started');
    });
    reviewContainer.addEventListener('touchend', function () {
        slideReviewsIntervalID = setInterval(slideReviews, animInterval);
        console.log('started');
    });
});