function filterPlaces(category) {
    const cards = document.querySelectorAll(".place-card");
  
    cards.forEach((card) => {
      if (category === "all") {
        card.style.display = "block";
      } else {
        card.style.display = card.classList.contains(category) ? "block" : "none";
      }
    });
  }
  