// Filter
document.addEventListener('DOMContentLoaded', function () {
    // Filter of works (simple)
    let activeCategory = localStorage.getItem('filter');
    function showFilteredWorks(activeCat) {
        [...document.querySelectorAll('.cardWork')].forEach(work => {
            const categories = work.getAttribute('data-category').split(',');
            if (!activeCat || categories.includes(activeCat)) {
                work.style.display = '';
            } else {
                work.style.display = 'none';
            }
        });
        [...document.querySelectorAll('.categories a')].forEach(btn => {
            btn.classList.toggle('activeCategory', btn.getAttribute('data-category') === activeCat);
        });
    }

    if (activeCategory) showFilteredWorks(activeCategory);
    [...document.querySelectorAll('.categories a')].forEach(btn => {
        btn.addEventListener('click', function(ev) {
            ev.preventDefault();
            activeCategory = btn.getAttribute('data-category');
            localStorage.setItem('filter', activeCategory);
            showFilteredWorks(activeCategory);
        });
    });



    // // Filter of works (complex)
    // const allWorks = [...document.querySelectorAll('.cardWork')];
    // let activeCategory = localStorage.getItem('filter');
    // function showWorks(filtered) {
    //     document.querySelector('.workCards').innerHTML = '';
    //     filtered.forEach(function(work) {
    //         document.querySelector('.workCards').appendChild(work);
    //     });
    // }

    // function setWorks(activeCat) {
    //     let filteredWorks = allWorks.filter(function(work) {
    //         const categories = work.getAttribute('data-category').split(',');
    //         return !activeCat || categories.includes(activeCat);
    //     });
    //     showWorks(filteredWorks);
    //     [...document.querySelectorAll('.categories a')].forEach(btn => {
    //         btn.classList.toggle('activeCategory', btn.getAttribute('data-category') === activeCat);
    //     });
    // }

    // if (activeCategory) setWorks(activeCategory);
    // [...document.querySelectorAll('.categories a')].forEach(function(btn) {
    //     btn.addEventListener('click', function(ev) {
    //         ev.preventDefault();
    //         activeCategory = btn.getAttribute('data-category');
    //         localStorage.setItem('filter', activeCategory);
    //         setWorks(activeCategory);
    //     });
    // });
});