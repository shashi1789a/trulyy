// Current Year in Footer
document.getElementById("year").textContent = new Date().getFullYear();

// Animate elements on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.3
});

document.querySelectorAll('.animate').forEach(el => observer.observe(el));
