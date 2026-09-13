//  SELECT ELEMENTS
// Mobile Menu
const menuButton = document.querySelector(".Icon_button");
const navLinks = document.querySelector(".nav-links");
// Dark Mode
const themeButton = document.getElementById("Theme_Mode");
// Category Buttons
const filterButtons = document.querySelectorAll(".buttons button");
// Gallery Items
const galleryItems = document.querySelectorAll(".gallery-item");
// Lightbox
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImg");
const closeButton = document.getElementById("closeBtn");
const previousButton = document.getElementById("prevBtn");
const nextButton = document.getElementById("nextBtn");

//---------------------------MOBILE MENU----------------------------

// Open or close the mobile navigation menu
menuButton.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

// Close the mobile menu after selecting a navigation link
const navigationLinks = document.querySelectorAll(".nav-links a");
navigationLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
    });
});
//------------------------DARK MODE--------------------------------------

// Enable or disable dark mode when the theme button is clicked
themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    updateThemeButton();
    saveTheme();
});
// Update the theme button icon based on the current theme
function updateThemeButton() {
    if (document.body.classList.contains("dark-mode")) {
        themeButton.textContent = "☀️";
    } else {
        themeButton.textContent = "🌙";
    }
}
//create function Save the selected theme to local storage
function saveTheme() {
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}
//create function Load the previously saved theme when the page starts
function loadTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
    updateThemeButton();
}
loadTheme();

//--------------------- CATEGORY FILTER-----------------------------------
// Filter gallery images based on the selected category
filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const selectedCategory =button.getAttribute("data-category");
        // Remove the active state from all category buttons
        filterButtons.forEach(function (button) {
            button.classList.remove("btn-active");
        });
        // Add the active state to the selected category button
        button.classList.add("btn-active");
        // Show matching images and hide other categories
        galleryItems.forEach(function (item) {
            const itemCategory =
                item.getAttribute("data-category");
            if (selectedCategory === "all"||selectedCategory === itemCategory){
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});

// ---------------------------LIGHTBOX--------------------------------
let currentImageIndex = 0;
/* Get Visible Gallery Images */
function getVisibleImages() {
    return Array.from(galleryItems).filter(function (item) {
        return item.style.display !== "none";
    });
}
/* Open Lightbox */
galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {
        const visibleImages = getVisibleImages();
        currentImageIndex = visibleImages.indexOf(item);
        showImage();
        openLightbox();
    });
});
/* Show Current Image */
function showImage() {
    const visibleImages = getVisibleImages();
    const currentItem = visibleImages[currentImageIndex];
    const image = currentItem.querySelector("img");
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
}
/* Open Lightbox */
function openLightbox() {
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}
//  CLOSE LIGHTBOX
closeButton.addEventListener("click", function () {
    closeLightbox();
});
function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}
/* Close When Clicking Outside Image */
lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});
//--------------------NEXT IMAGE---------------
nextButton.addEventListener("click", function () {
    showNextImage();
});
function showNextImage() {
    const visibleImages = getVisibleImages();
    if (visibleImages.length === 0) {
        return;
    }
    currentImageIndex++;
    if (currentImageIndex >= visibleImages.length) {
        currentImageIndex = 0;
    }
    showImage();
}
//-------------------------PREVIOUS IMAGE------------------
previousButton.addEventListener("click", function () {
    showPreviousImage();
});
function showPreviousImage() {
    const visibleImages = getVisibleImages();
    if (visibleImages.length === 0) {
        return;
    }
    currentImageIndex--;
    if (currentImageIndex < 0) {
        currentImageIndex = visibleImages.length - 1;
    }
    showImage();
}
//------------------KEYBOARD CONTROLS-------------------
document.addEventListener("keydown", function (event) {
    if (!lightbox.classList.contains("active")) {
        return;
    }
    if (event.key === "Escape") {
        closeLightbox();
    }
    if (event.key === "ArrowRight") {
        showNextImage();
    }
    if (event.key === "ArrowLeft") {
        showPreviousImage();
    }
});
