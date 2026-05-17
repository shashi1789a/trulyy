function exploreNow() {
    alert("Redirecting to explore page!");
    // You can use window.location.href = "/explore.html" for actual redirection
  }

  const slides = document.querySelectorAll('.background-slide');
  let current = 0;

  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 2000); // Change image every 2 seconds