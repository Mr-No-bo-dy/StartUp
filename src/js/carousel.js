document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel_container'),
        cards = [...document.querySelectorAll('.cardDev')],
        btnLeft = document.querySelector('#carouselLeft'),
        btnRight = document.querySelector('#carouselRight');

    let currentPosition = 0,
        visibleCards = 1,
        cardWidth = cards[0].offsetWidth,
        gap = 29.33,
        slideDistance = cardWidth + gap,
        isSliding = false,
        swipeStartX = 0,
        swipeEndX = 0;

    // Calculate & update card's adapted width
    function updateCardWidths() {
        if (window.innerWidth >= 1920) {
            cardWidth = (carousel.offsetWidth - 5 * gap) / 6;
            visibleCards = 6;
        } else if (window.innerWidth >= 1440) {
            cardWidth = (carousel.offsetWidth - 4 * gap) / 5;
            visibleCards = 5;
        } else if (window.innerWidth >= 1100) {
            cardWidth = (carousel.offsetWidth - 3 * gap) / 4;
            visibleCards = 4;
        } else if (window.innerWidth >= 800) {
            cardWidth = (carousel.offsetWidth - 2 * gap) / 3;
            visibleCards = 3;
        } else if (window.innerWidth >= 500) {
            cardWidth = (carousel.offsetWidth - 1 * gap) / 2;
            visibleCards = 2;
        } else {
            cardWidth = carousel.offsetWidth;
        }

        cards.forEach(function(card) {
            card.style.minWidth = `${cardWidth}px`;
        });
        slideDistance = cardWidth + gap;

        // Show/Hide right-left buttons
        if (cards.length > visibleCards) {
            btnLeft.style.display = 'block';
            btnRight.style.display = 'block';
        } else {
            btnLeft.style.display = 'none';
            btnRight.style.display = 'none';
        }
    }
    updateCardWidths();
    window.addEventListener('resize', updateCardWidths);

    // Slide to Right
    function slideRight() {
        if (isSliding) return;
        isSliding = true;

        currentPosition -= slideDistance;
        carousel.style.transform = `translateX(${currentPosition}px)`;

        carousel.addEventListener('transitionend', function animRight() {
            const firstCard = cards.shift();
            cards.push(firstCard);
            carousel.insertAdjacentElement('beforeend', firstCard);

            currentPosition += slideDistance;
            carousel.style.transition = 'none';
            carousel.style.transform = `translateX(${currentPosition}px)`;

            setTimeout(function() {
                carousel.style.transition = 'transform 0.5s ease-in-out';
                isSliding = false;
            }, 50);

            carousel.removeEventListener('transitionend', animRight);
        });
    }
    btnRight.addEventListener('click', slideRight);

    // Slide to Left
    function slideLeft() {
        if (isSliding) return;
        isSliding = true;

        const lastCard = cards.pop();
        cards.unshift(lastCard);
        carousel.insertAdjacentElement('afterbegin', lastCard);

        currentPosition -= slideDistance;
        carousel.style.transition = 'none';
        carousel.style.transform = `translateX(${currentPosition}px)`;

        setTimeout(function() {
            currentPosition += slideDistance;
            carousel.style.transition = 'transform 0.5s ease-in-out';
            carousel.style.transform = `translateX(${currentPosition}px)`;
            carousel.addEventListener('transitionend', function animLeft() {
                isSliding = false;
                carousel.removeEventListener('transitionend', animLeft);
            });
        }, 50);
    }
    btnLeft.addEventListener('click', slideLeft);

    // Swipe carousel
    carousel.addEventListener('touchstart', function(ev) {
        // console.log(ev);
        swipeStartX = ev.touches[0].pageX;
    });
    carousel.addEventListener('touchmove', function(ev) {
        swipeEndX = ev.touches[0].pageX;
    });
    carousel.addEventListener('touchend', function() {
        const swipeDistance = swipeEndX - swipeStartX;
        if (swipeDistance > 50) {
            slideLeft();  // Swipe to right
        } else if (swipeDistance < -50) {
            slideRight(); // Swipe to left
        }
        swipeStartX = 0;
        swipeEndX = 0;
    });
});
