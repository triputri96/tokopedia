// Ambil elemen yang diperlukan
let list = document.querySelector(".slider .list");
let items = document.querySelectorAll(".slider .list .item");
let dots = document.querySelectorAll(".dots li");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let slider = document.getElementById("slider");

slider.addEventListener("mouseenter", () => {
  let button = document.getElementsByClassName("button");
  console.log(button);
  Array.from(button).forEach((el) => {
    console.log(el);
    if (el.classList.contains("hidden")) {
      el.classList.remove("hidden");
    }
  });
});

slider.addEventListener("mouseleave", () => {
  let button = document.getElementsByClassName("button");
  console.log(button);
  Array.from(button).forEach((el) => {
    console.log(el);
    if (!el.classList.contains("hidden")) {
      el.classList.add("hidden");
    }
  });
});

let active = 0;
let lengthItems = items.length;

let firstClone = items[0].cloneNode(true);
let lastClone = items[lengthItems - 1].cloneNode(true);
list.appendChild(firstClone);
list.insertBefore(lastClone, items[0]);

list.style.left = `-${items[0].offsetWidth}px`;

function slideToLeft() {
  list.style.left = `-${(active + 1) * items[0].offsetWidth}px`;
  updateDots();
}

function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === active);
  });
}

next.onclick = function () {
  if (active >= lengthItems) {
    list.style.transition = "none";
    list.style.left = `-${items[0].offsetWidth}px`;
    active = 0;
    setTimeout(() => {
      list.style.transition = "1s";
      active++;
      slideToLeft();
    }, 20);
  } else {
    active++;
    slideToLeft();
  }
};

prev.onclick = function () {
  if (active <= -1) {
    list.style.transition = "none";
    list.style.left = `-${lengthItems * items[0].offsetWidth}px`;
    active = lengthItems - 1;
    setTimeout(() => {
      list.style.transition = "0.5s";
      slideToLeft();
    }, 20);
  } else {
    active--;
    slideToLeft();
  }
};

dots.forEach((dot, index) => {
  dot.onclick = function () {
    active = index;
    slideToLeft();
  };
});

setInterval(() => {
  next.click();
}, 5000);

// fixed
document.addEventListener("DOMContentLoaded", function () {
  const tabList = document.querySelector(".tab-list");
  const allProductSection = document.querySelector(".all-product");
  const navbarHeight = 60; // Adjust based on your navbar height

  window.addEventListener("scroll", function () {
    const sectionTop = allProductSection.offsetTop;
    const sectionBottom = sectionTop + allProductSection.offsetHeight;
    const scrollPosition = window.scrollY + navbarHeight;

    if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
      tabList.classList.add("fixed");
    } else {
      tabList.classList.remove("fixed");
    }
  });
});
