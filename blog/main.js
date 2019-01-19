
document.addEventListener('DOMContentLoaded', function() {
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


  function attachFbScript() {
    const head = document.querySelector("head");
    const loader = document.querySelector(".loader");
    const script = document.createElement("script");
    script.src = "/fb.js";

    if (!document.querySelector('script[src*="fb.js"]')) {
        head.appendChild(script);
    }

    window.setTimeout(function() {
      loader.classList.add("hide");
    }, 1500)

  }


  function isElementInViewport(el) {
    if(el) {
      var rect = el.getBoundingClientRect();
      return rect.bottom > 0 &&
          rect.right > 0 &&
          rect.left < (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */ &&
          rect.top < (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */;
    }
  }

  (function showComments() {
    const lastpar = document.querySelector('.post__content p:last-child');
    window.addEventListener('scroll', function() {
      if(lastpar) {
        window.setTimeout(function() {
          attachFbScript();
        }, 1500);
      }
    })
  })();

})
