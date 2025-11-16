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

// Service card details
const serviceDetails = {
  service1: {
    title: "Freight Delivery",
    description:
      "Transpotalent provides fast and secure freight delivery across the USA. Our team ensures timely pickup, transit monitoring, and safe delivery of your cargo.",
  },
  service2: {
    title: "Fleet Management",
    description:
      "Optimize your fleet with our fleet management solutions. Track vehicles, schedule maintenance, and maximize efficiency with our expert support.",
  },
  service3: {
    title: "Driver Staffing",
    description:
      "We offer reliable, experienced drivers for all transportation needs. Our recruitment ensures qualified staff, background checks, and professional service.",
  },
};

// Open modal on card click
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("click", () => {
    const service = card.getAttribute("data-service");
    modalTitle.textContent = serviceDetails[service].title;
    modalDescription.textContent = serviceDetails[service].description;
    modal.style.display = "block";
  });
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

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
