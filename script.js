document.addEventListener('DOMContentLoaded', function() {

    // --- FITUR 1: DATA DAN LOOPING UNTUK KARTU ANGGOTA ---
    // Data anggota disimpan dalam sebuah array of objects.
    const membersData = [
        {
            name: "Yeji (예지)",
            role: "Leader, Main Dancer, Lead Vocalist",
            image: "assets/members/yeji.jpeg",
            alt: "Foto Yeji"
        },
        {
            name: "Lia (리아)",
            role: "Main Vocalist, Sub-Rapper",
            image: "assets/members/lia.jpeg",
            alt: "Foto Lia"
        },
        {
            name: "Ryujin (류진)",
            role: "Main Rapper, Lead Dancer, Center",
            image: "assets/members/ryujin.jpeg",
            alt: "Foto Ryujin"
        },
        {
            name: "Chaeryeong (채령)",
            role: "Main Dancer, Sub-Vocalist",
            image: "assets/members/chaeryeong.jpeg",
            alt: "Foto Chaeryeong"
        },
        {
            name: "Yuna (유나)",
            role: "Lead Rapper, Visual, Maknae",
            image: "assets/members/yuna.jpeg",
            alt: "Foto Yuna"
        }
    ];

    const cardsContainer = document.querySelector('.member-cards-container');

    membersData.forEach(member => {
        const card = document.createElement('article');
        card.className = 'member-card';
        card.innerHTML = `
            <img src="${member.image}" alt="${member.alt}" class="member-photo">
            <div class="member-info">
                <h3>${member.name}</h3>
                <p class="member-role">${member.role}</p>
            </div>
        `;
        cardsContainer.appendChild(card);
    });


    // --- FITUR 2: HEADER INTERAKTIF SAAT SCROLL ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {

        header.classList.toggle('scrolled', window.scrollY > 0);
    });


    // --- FITUR 3: ANIMASI FADE-IN SAAT SCROLL (INTERSECTION OBSERVER) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 
    });

    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach(card => observer.observe(card));

     // --- FITUR 5: SLIDER VIDEO MUSIK ---
    const mvData = [
        { 
            title: "UNTOUCHABLE", 
            videoImage: "5e3rKInegeU",
            videoUrl: "https://www.youtube.com/watch?v=5e3rKInegeU&list=RD5e3rKInegeU&start_radio=1" 
        },
        { 
            title: "CAKE",        
            videoImage: "0bIRwBpBcZQ",
            videoUrl: "https://www.youtube.com/watch?v=0bIRwBpBcZQ&list=RD0bIRwBpBcZQ&start_radio=1"
        },
        { 
            title: "WANNABE",     
            videoImage: "fE2h3lGlOsk",
            videoUrl: "https://www.youtube.com/watch?v=fE2h3lGlOsk&list=RDF-h3IlGlOsk&start_radio=1"
        },
        { 
            title: "LOCO",        
            videoImage: "MjCZfZfucEc",
            videoUrl: "https://www.youtube.com/watch?v=MjCZfZfucEc&list=RDMjCZfZfucEc&start_radio=1"
        },
        { 
            title: "SNEAKERS",    
            videoImage: "Hbb5GPxXF1w",
            videoUrl: "https://www.youtube.com/watch?v=Hbb5GPxXF1w&list=RDHbb5GPxXF1w&start_radio=1"
        }
    ];

    const sliderTrack = document.querySelector('.slider-track');
        
    // 1. Buat kartu video secara dinamis
    mvData.forEach(mv => {
        const cardHTML = `
            <div class="slider-card">
                <a href="${mv.videoUrl}" target="_blank" rel="noopener noreferrer">
                    <div class="video-thumbnail">
                        <img src="https://i.ytimg.com/vi/${mv.videoImage}/hqdefault.jpg" alt="Thumbnail for ${mv.title}">
                        <i class="fas fa-play-circle play-icon"></i>
                    </div>
                    <p class="video-title">${mv.title}</p>
                </a>
            </div>
        `;
        sliderTrack.innerHTML += cardHTML;
    });

    // 2. Logika slider
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const cards = document.querySelectorAll('.slider-card');
    let currentIndex = 0;
    let cardsToShow = 1;

    // Fungsi untuk mengatur ulang dan memperbarui posisi slider
    function updateSlider() {
        // Cek berapa kartu yang terlihat berdasarkan lebar layar
        if (window.innerWidth >= 1024) {
            cardsToShow = 3;
        } else if (window.innerWidth >= 768) {
            cardsToShow = 2;
        } else {
            cardsToShow = 1;
        }

        const cardWidth = cards[0].offsetWidth;
        sliderTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        
        // Atur status tombol (aktif/non-aktif)
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= cards.length - cardsToShow;
    }

    // Event listener untuk tombol 'next'
    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - cardsToShow) {
            currentIndex++;
            updateSlider();
        }
    });

    // Event listener untuk tombol 'prev'
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    // Perbarui slider saat ukuran jendela berubah (untuk responsivitas)
    window.addEventListener('resize', () => {
        // Pastikan index tidak keluar dari batas saat resize
        if (currentIndex >= cards.length - cardsToShow) {
             currentIndex = cards.length - cardsToShow;
        }
        updateSlider();
    });

    // Inisialisasi slider saat halaman pertama kali dimuat
    updateSlider();

     // --- FITUR 6: HAMBURGER MENU ---
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.header-right');
    const navLinks = document.querySelectorAll('.header-right a');

    // Buka/Tutup menu saat hamburger di-klik
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });


    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });


});