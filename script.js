document.addEventListener("DOMContentLoaded", () => {
  const gridItems = document.querySelectorAll(".area3-grid .grid-item");
  const savedStates = JSON.parse(localStorage.getItem("activeGridItems")) || [];

  gridItems.forEach((item, index) => {
    if (savedStates.includes(index)) item.classList.add("active");

    item.addEventListener("click", () => {
      item.classList.toggle("active");
      const activeIndexes = Array.from(gridItems)
        .map((el, i) => (el.classList.contains("active") ? i : null))
        .filter(i => i !== null);
      localStorage.setItem("activeGridItems", JSON.stringify(activeIndexes));
    });
  });
});

const navLinks = document.querySelectorAll("nav ul li a");
const sections = document.querySelectorAll("section");
let isClicking = false;

function removeActive() {
  navLinks.forEach(link => link.classList.remove("active"));
}

navLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href.startsWith("#")) return;
    e.preventDefault();
    isClicking = true;
    removeActive();
    this.classList.add("active");

    const targetId = href.substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      isClicking = false;
    }, 500);
  });
});

window.addEventListener("scroll", () => {
  if (isClicking) return;
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

const options = document.querySelectorAll(".option");
const contents = document.querySelectorAll(".image-text-container");

options.forEach(option => {
  option.addEventListener("click", () => {
    options.forEach(opt => opt.classList.remove("active"));
    contents.forEach(content => (content.style.display = "none"));
    option.classList.add("active");
    const targetId = option.getAttribute("data-target");
    document.getElementById(targetId).style.display = "flex";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("accessibility-popup");
  const trigger = document.querySelector(".nav-last a");
  const increaseBtn = document.getElementById("increase-text");
  const decreaseBtn = document.getElementById("decrease-text");
  const sizeDisplay = document.getElementById("current-size");
  let currentSize = 100;

  trigger.addEventListener("click", e => {
    e.preventDefault();
    popup.classList.toggle("active");
  });

  document.addEventListener("click", e => {
    if (!popup.contains(e.target) && !trigger.contains(e.target)) {
      popup.classList.remove("active");
    }
  });

  increaseBtn.addEventListener("click", () => {
    if (currentSize < 200) {
      currentSize += 10;
      document.documentElement.style.fontSize = currentSize + "%";
      sizeDisplay.textContent = currentSize + "%";
    }
  });

  decreaseBtn.addEventListener("click", () => {
    if (currentSize > 70) {
      currentSize -= 10;
      document.documentElement.style.fontSize = currentSize + "%";
      sizeDisplay.textContent = currentSize + "%";
    }
  });
});

const contrastBtn = document.getElementById("toggle-contrast");
contrastBtn.addEventListener("click", () => {
  document.body.classList.toggle("high-contrast");
  const isActive = document.body.classList.contains("high-contrast");
  contrastBtn.setAttribute("aria-pressed", isActive);
  contrastBtn.textContent = isActive ? "Disable" : "Enable";
});

document.addEventListener("DOMContentLoaded", () => {
  const options = document.querySelectorAll(".option");
  const contents = document.querySelectorAll(".image-text-container");

  contents.forEach((content, index) => {
    content.style.display = index === 0 ? "flex" : "none";
  });

  options.forEach((option, index) => {
    option.classList.toggle("active", index === 0);
  });

  options.forEach(option => {
    option.addEventListener("click", () => {
      options.forEach(opt => opt.classList.remove("active"));
      contents.forEach(content => (content.style.display = "none"));
      option.classList.add("active");
      const targetId = option.getAttribute("data-target");
      document.getElementById(targetId).style.display = "flex";
    });
  });
});
