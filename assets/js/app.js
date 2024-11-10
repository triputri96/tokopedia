// Ambil elemen yang diperlukan
let list = document.querySelector(".slider .list");
let items = document.querySelectorAll(".slider .list .item");
let dots = document.querySelectorAll(".dots li");
let prev = document.getElementById("prev");
let next = document.getElementById("next");
let slider = document.getElementById("slider");
// Select all images with id="image" using querySelectorAll
// let images = document.querySelectorAll("#image");

// images.forEach((img) => {
//   img.style.borderRadius = "15px";
// });

// slider.addEventListener("mouseenter", () => {
//   let button = document.getElementsByClassName("button");
//   console.log(button);
//   Array.from(button).forEach((el) => {
//     console.log(el);
//     if (el.classList.contains("hidden")) {
//       el.classList.remove("hidden");
//     }
//   });
// });

// slider.addEventListener("mouseleave", () => {
//   let button = document.getElementsByClassName("button");
//   console.log(button);
//   Array.from(button).forEach((el) => {
//     console.log(el);
//     if (!el.classList.contains("hidden")) {
//       el.classList.add("hidden");
//     }
//   });
// });

let active = 0;
let lengthItems = items.length;

// Menambahkan elemen klon pertama dan terakhir untuk efek loop tanpa batas
let firstClone = items[0].cloneNode(true);
let lastClone = items[lengthItems - 1].cloneNode(true);
list.appendChild(firstClone);
list.insertBefore(lastClone, items[0]);

// Setel posisi awal ke slide pertama yang asli
list.style.left = `-${items[0].offsetWidth}px`;

// Fungsi untuk berpindah ke slide berikutnya
function slideToLeft() {
  list.style.left = `-${(active + 1) * items[0].offsetWidth}px`;
  updateDots();
}

// Fungsi untuk memperbarui status titik (dot) indikator
function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === active);
  });
}

// Fungsi untuk tombol 'Next'
next.onclick = function () {
  if (active >= lengthItems) {
    list.style.transition = "none"; // Tanpa transisi saat reset
    list.style.left = `-${items[0].offsetWidth}px`;
    active = 0;
    setTimeout(() => {
      list.style.transition = "1s";
      active++;
      slideToLeft();
    }, 20); // Waktu delay agar reset terlihat
  } else {
    active++;
    slideToLeft();
  }
};

// Fungsi untuk tombol 'Prev'
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

// Fungsi untuk mengklik titik (dot) indikator
dots.forEach((dot, index) => {
  dot.onclick = function () {
    active = index;
    slideToLeft();
  };
});

setInterval(() => {
  next.click();
}, 5000); // Setiap 5 detik
