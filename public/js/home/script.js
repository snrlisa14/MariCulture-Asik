// script yang meeting
document.addEventListener("DOMContentLoaded", function () {
    const slide = document.querySelector(".slide");
    const nextBtn = slide.querySelector(".next");
    const prevBtn = slide.querySelector(".prev");
    const counter = slide.querySelector(".counter");
    const judulMeet = document.querySelector(".judul-meet");
    const subMeet = document.querySelector(".sub-meet");
    const desMeet = document.querySelector(".des-meet");
    const link = document.querySelector(".link-content");

    nextBtn.addEventListener("click", function () {
        const currentCounter = counter.textContent;
        if (currentCounter === "1/6") {
            // Mengubah konten elemen-elemen saat slide dipindahkan ke slide kedua
            judulMeet.textContent = "Jinten";
            subMeet.textContent = "ROOM";
            desMeet.textContent =
                "Jinten suitable for wedding and holy ceremony that require an intimate and closed to each other guests. This venue has 300 m2 could accommodate up to 300 guests with theater set up.";
            document.querySelector(".section-meeting").style.backgroundImage =
                "url('./public/images/assets/meeting2/jinten-room.png')";
            counter.textContent = "2/6";
            link.href = "/meeting/detail/12";
        } else if (currentCounter === "2/6") {
            // Mengubah konten elemen-elemen saat slide dipindahkan ke slide ketiga
            judulMeet.textContent = "Keningar";
            subMeet.textContent = "ROOM";
            desMeet.textContent =
                "Keningar meeting room with an area of 227 m2 suitable for wedding and party that can accommodate up to 200 guets.";
            document.querySelector(".section-meeting").style.backgroundImage =
                "url('./public/images/assets/meeting2/keningar-room.png')";
            counter.textContent = "3/6";
            link.href = "/meeting/detail/11";
        } else if (currentCounter === "3/6") {
            // Mengubah konten elemen-elemen saat slide dipindahkan ke slide keempat
            judulMeet.textContent = "Lengkuas";
            subMeet.textContent = "ROOM";
            desMeet.textContent =
                "Located on2nd Floor, Lengkuas purposely designed for medium functions to accommodate up to 155 guests.";
            document.querySelector(".section-meeting").style.backgroundImage =
                "url('./public/images/assets/meeting2/lengkuas-room.png')";
            counter.textContent = "4/6";
            link.href = "/meeting/detail/10";
        } else if (currentCounter === "4/6") {
            // Mengubah konten elemen-elemen saat slide dipindahkan ke slide kelima
            judulMeet.textContent = "Kapulaga - Kunir";
            subMeet.textContent = "ROOM";
            desMeet.textContent =
                "Kapulaga - Kunir with 96 m2 can accommodate up to 100 people with theater set up. This venue suiteable for training event and meeting with medium scale groups.";
            document.querySelector(".section-meeting").style.backgroundImage =
                "url('./public/images/assets/meeting2/kapulaga-room.png')";
            counter.textContent = "5/6";
            link.href = "/meeting/detail/9";
        } else if (currentCounter === "5/6") {
            // Mengubah konten elemen-elemen saat slide dipindahkan ke slide keenam
            judulMeet.textContent = "Kemiri";
            subMeet.textContent = "ROOM";
            desMeet.textContent =
                "Kemiri is one of the comfortable meeting rooms, it can accommodate up to 30 people. This venue suitable for training and meeting with small group.";
            document.querySelector(".section-meeting").style.backgroundImage =
                "url('./public/images/assets/meeting2/kemiri-room.png')";
            counter.textContent = "6/6";
            link.href = "/meeting/detail/8";
        }
        // Tambahkan kondisi untuk slide selanjutnya jika diperlukan
        changeBackgroundImage(); // Memicu animasi perubahan gambar latar belakang
    });

    prevBtn.addEventListener("click", function () {
        const currentCounter = counter.textContent;
        if (currentCounter === "2/6") {
            // Kembali ke konten slide pertama
            judulMeet.textContent = "Pala";
            subMeet.textContent = "BALLROOM";
            desMeet.textContent =
                "Spacious ballroom 420 m2 with capacity up to 700 guests. The perfect venue for seminar, wedding or party. Our professional team be pleasure to arranged your event whileensure your satisfaction.";
            document.querySelector(".section-meeting").style.backgroundImage =
                "url('./public/images/assets/meeting2/pala-room.png')";
            counter.textContent = "1/6";
            link.href = "/meeting/detail/13";
        } else if (currentCounter === "3/6") {
            // Kembali ke slide sebelumnya saat slide dipindahkan ke slide kedua
            judulMeet.textContent = "Jinten";
            subMeet.textContent = "Room";
            desMeet.textContent =
                "Jinten suitable for wedding and holy ceremony that require an intimate and closed to each other guests. This venue has 300 m2 could accommodate up to 300 guests with theater set up.";
            document.querySelector(".section-meeting").style.backgroundImage =
                "url('./public/images/assets/meeting2/jinten-room.png')";
            counter.textContent = "2/6";
            link.href = "/meeting/detail/12";
        } else if (currentCounter === "4/6") {
            // Kembali ke slide sebelumnya saat slide dipindahkan ke slide ketiga
            judulMeet.textContent = "KENINGAR";
            subMeet.textContent = "ROOM";
            desMeet.textContent =
                "Keningar meeting room with an area of 227 m2 suitable for wedding and party that can accommodate up to 200 guets.";
            document.querySelector(".section-meeting").style.backgroundImage =
                "url('./public/images/assets/meeting2/keningar-room.png')";
            counter.textContent = "3/6";
            link.href = "/meeting/detail/11";
        } else if (currentCounter === "5/6") {
            // Kembali ke slide sebelumnya saat slide dipindahkan ke slide keempat
            judulMeet.textContent = "Lengkuas";
            subMeet.textContent = "ROOM";
            desMeet.textContent =
                "Located on2nd Floor, Lengkuas purposely designed for medium functions to accommodate up to 155 guests.";
            document.querySelector(".section-meeting").style.backgroundImage =
                "url('./public/images/assets/meeting2/lengkuas-room.png')";
            counter.textContent = "4/6";
            link.href = "/meeting/detail/10";
        } else if (currentCounter === "6/6") {
            // Kembali ke slide sebelumnya saat slide dipindahkan ke slide kelima
            judulMeet.textContent = "Kapulaga - Kunir";
            subMeet.textContent = "ROOM";
            desMeet.textContent =
                "Kapulaga - Kunir with 96 m2 can accommodate up to 100 people with theater set up. This venue suiteable for training event and meeting with medium scale groups.";
            document.querySelector(".section-meeting").style.backgroundImage =
                "url('./public/images/assets/meeting2/kapulaga-room.png')";
            counter.textContent = "5/6";
            link.href = "/meeting/detail/9";
        } else if (currentCounter === "6/6") {
            // Kembali ke slide sebelumnya saat slide dipindahkan ke slide keenam
            judulMeet.textContent = "Kemiri";
            subMeet.textContent = "ROOM";
            desMeet.textContent =
                "Kemiri is one of the comfortable meeting rooms, it can accommodate up to 30 people. This venue suitable for training and meeting with small group.";
            document.querySelector(".section-meeting").style.backgroundImage =
                "url('./public/images/assets/meeting2/kemiri-room.png')";
            counter.textContent = "6/7";
            link.href = "/meeting/detail/8";
        }
        // Tambahkan kondisi untuk slide sebelumnya jika diperlukan
        changeBackgroundImage(); // Memicu animasi perubahan gambar latar belakang
    });
});

const changeBackgroundLeftBtn2 = document.getElementById(
    "changeBackgroundLeftBtn2"
);
const changeBackgroundRightBtn2 = document.getElementById(
    "changeBackgroundRightBtn2"
);
const slideNumber2 = document.getElementById("slideNumber2");
const judulMeet2 = document.querySelector(".judul-meet2");
const subMeet2 = document.querySelector(".sub-meet2");
const desMeet2 = document.querySelector(".des-meet2");
const link2 = document.querySelector(".link-content2");

let currentSlide = 1;

// Function to change background image and update slide number
function changeBackgroundImage() {
    const sectionExplore = document.querySelector(".section-explore");
    if (currentSlide === 1) {
        sectionExplore.style.backgroundImage =
            "url('./public/images/assets/explore2/cafe.png')";
        slideNumber2.textContent = "1/4"; // Update slide number

        link2.href = "/food/detail/7";
        // Update content for slide 1
        judulMeet2.textContent = "CAFE TAMAN";
        desMeet2.textContent =
            " One of the Surabaya iconic Lounge In the Central City Green Garden concept to relaxing your activity after work with a cozy atmosphere. Where you can listen to live music in the evenings or casually meet for business.We serve a Signature surabaya Meals & Beverage to completed your experience";
    } else if (currentSlide === 2) {
        sectionExplore.style.backgroundImage =
            "url('./public/images/assets/explore2/spa.png')";
        slideNumber2.textContent = "2/4"; // Update slide number

        // Update content for slide 2
        link2.href = "/spa/detail/2";
        judulMeet2.textContent = "SPA";
        desMeet2.textContent =
            "Inspired by its magnifience philosophy and benefit, Sasmita beauty & Relaxation will pampering you with the aesthetic luxurious and elegantly services. Luxuriate under our distinctive spa therapies combine the celebrated techniques of expertly trained therapist and beautician with products developed from nature’s most precious ingredients.";
    } else if (currentSlide === 3) {
        // Update content for slide 3
        sectionExplore.style.backgroundImage =
            "url('./public/images/assets/explore2/restaurant.png')";
        slideNumber2.textContent = "3/4"; // Update slide number

        // Update content for slide 2
        link2.href = "/food/detail/5";
        judulMeet2.textContent = "KARTINI RESTAURANT";
        desMeet2.textContent =
            "Kartini's Restaurant always welcoming your breakfast everyday & offers a great culinary dining experience from authentic of Indonesian cuisine, asian to international menu. It open daily 24 hours with a relaxing atmosphere.";
    } else if (currentSlide === 4) {
        // Update content for slide 4
        sectionExplore.style.backgroundImage =
            "url('./public/images/assets/explore2/fitnes.png')";
        slideNumber2.textContent = "4/4"; // Update slide number

        // Update content for slide 2
        link2.href = "/pool/detail/8";
        judulMeet2.textContent = "FITNES CENTRE";
        desMeet2.textContent =
            "Drill your self and team with our body building program out gymnastic studio can maximized up to 25 peoples, and choices of program zumba, yoga and aerobic";
    }
}

// Event listener for clicking on the left button
changeBackgroundLeftBtn2.addEventListener("click", function (event) {
    event.preventDefault();
    if (currentSlide > 1) {
        currentSlide--;
        changeBackgroundImage();
    }
});

// Event listener for clicking on the right button
changeBackgroundRightBtn2.addEventListener("click", function (event) {
    event.preventDefault();
    if (currentSlide < 4) {
        // Assuming there are only 4 slides
        currentSlide++;
        changeBackgroundImage();
    }
});

// wa
// Fungsi untuk menampilkan elemen setelah jeda waktu tertentu
function showElementAfterDelay(elementId, delay) {
    setTimeout(function () {
        var element = document.getElementById(elementId);
        if (element) {
            element.style.display = "block";
        }
    }, delay);
}

// Panggil fungsi showElementAfterDelay dengan ID elemen dan waktu jeda dalam milidetik (3000 milidetik = 3 detik)
showElementAfterDelay("chat-wa-container", 6000);
