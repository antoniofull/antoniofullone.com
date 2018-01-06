
(function toggleHeader () {
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', function() {
    const scroll = window.scrollY;
    if(scroll > 100) {
      header.classList.add('shrink');
    } else {
      header.classList.remove('shrink');
    }    
  })
})();