const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
  hamburger.classList.toggle("open");
});

// Animate hamburger menu to "X"
hamburger.addEventListener("click", () => {
  const spans = hamburger.querySelectorAll("span");
  spans[0].classList.toggle("rotate-down");
  spans[1].classList.toggle("fade-out");
  spans[2].classList.toggle("rotate-up");
});

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;
const slideInterval = setInterval(nextSlide, 5000); // Auto slide every 5s

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    dots[i].classList.toggle("active", i === index);
  });
  currentIndex = index;
}

function nextSlide() {
  let nextIndex = (currentIndex + 1) % slides.length;
  showSlide(nextIndex);
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    clearInterval(slideInterval);
    showSlide(i);
  });
});

// Select modal elements
const modal = document.getElementById("serviceModal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const closeBtn = document.querySelector(".modal .close");

// Updated Service card details based on new offerings
const serviceDetails = {
  dryvan: {
    title: "Dry Van",
    description:
      "Motus provides secure, enclosed dry van trailers to protect your freight from the elements. Ideal for consumer goods, electronics, and non-perishable food items, ensuring safe and timely delivery nationwide.",
  },
  flatbed: {
    title: "Flatbed Loads",
    description:
      "Our flatbed services offer the versatility needed for oversized, heavy, or awkwardly shaped equipment. We handle construction materials, machinery, and more, equipped with proper securement for safe transit.",
  },
  poweronly: {
    title: "Power Only",
    description:
      "Need a truck for your trailer? Our Power Only service pairs our experienced Owner Operators and modern trucks with your loaded or empty trailers, offering a flexible and cost-effective logistics solution.",
  },
};

// Open modal on card click
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("click", () => {
    const service = card.getAttribute("data-service");
    if(serviceDetails[service]) {
        modalTitle.textContent = serviceDetails[service].title;
        modalDescription.textContent = serviceDetails[service].description;
        modal.style.display = "block";
    }
  });
});

// Close modal
if(closeBtn) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
}

// Close modal on outside click
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

// Animate counters when in viewport
const counters = document.querySelectorAll(".counter");

const options = { threshold: 0.5 }; // Trigger when half visible

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = +counter.getAttribute("data-target");
      let count = 0;
      const increment = target / 200; // smooth increment

      const updateCounter = () => {
        count += increment;
        if (count < target) {
          counter.textContent = Math.ceil(count);
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target;
        }
      };

      updateCounter();
      observer.unobserve(counter);
    }
  });
}, options);

counters.forEach((counter) => {
  counterObserver.observe(counter);
});

// Animate process steps when in viewport
const steps = document.querySelectorAll(".process-step");

const Toptions = { threshold: 0.3 };

const stepObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, Toptions);

steps.forEach((step) => {
  step.style.opacity = 0;
  step.style.transform = "translateY(30px)";
  stepObserver.observe(step);
});