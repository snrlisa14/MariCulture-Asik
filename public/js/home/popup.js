document.addEventListener("DOMContentLoaded", function () {
    // Create the overlay element
    var overlay = document.createElement("div");
    overlay.classList.add("overlay");

    // Append the overlay to the body
    document.body.appendChild(overlay);

    // Create the popup element
    var popup = document.createElement("div");
    popup.classList.add("popup");
    popup.innerHTML = `
        <span class="close-icon"><i class="fas fa-times"></i></span>
        <img class="image-popup" src="/public/uploads/<?php echo $slider->photo; ?>" alt="Selamat Datang">
        <a href="#" class="book-now">BOOK NOW</a>
    `;

    // Append the popup to the body
    document.body.appendChild(popup);

    // Function to close the popup
    function closePopup() {
        overlay.classList.remove("active");
        popup.classList.remove("active");

        overlay.classList.add("nonactive");
        popup.classList.add("nonactive");
    }

    // Add event listener to the close icon
    var closeIcon = popup.querySelector(".close-icon");
    closeIcon.addEventListener("click", closePopup);

    // Add event listener to the overlay to close the popup when clicked outside
    overlay.addEventListener("click", function (event) {
        if (event.target === overlay) {
            closePopup();
        }
    });

    // Show the overlay and popup with a delay to allow transition to occur
    setTimeout(function () {
        overlay.classList.add("active");
        popup.classList.add("active");
    }, 100);
});
