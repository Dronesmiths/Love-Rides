// Interactive Static Site Logic for Love Rides
document.addEventListener('DOMContentLoaded', () => {

    // Initialize Swiper for the Sponsors Carousel
    if (typeof Swiper !== 'undefined') {
        new Swiper('.sponsor-carousel', {
            slidesPerView: 2,
            spaceBetween: 40,
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            breakpoints: {
                640: {
                    slidesPerView: 3,
                },
                1024: {
                    slidesPerView: 5,
                },
            }
        });
    }

    // Impact Counters Animation
    const stats = document.querySelectorAll('.stat-num');

    const animateStat = (el) => {
        const rawValue = el.innerText.replace(/[^0-9]/g, '');
        const target = parseInt(rawValue);
        const prefix = el.innerText.startsWith('$') ? '$' : '';
        const suffix = el.innerText.replace(/[0-9$,]/g, '');

        let count = 0;
        const duration = 2000;
        const frameRate = 1000 / 60;
        const totalFrames = Math.round(duration / frameRate);
        let frame = 0;

        const updateCount = () => {
            frame++;
            const progress = frame / totalFrames;
            // Ease out cubic
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            count = Math.floor(easedProgress * target);

            el.innerText = `${prefix}${count.toLocaleString()}${suffix}`;

            if (frame < totalFrames) {
                requestAnimationFrame(updateCount);
            } else {
                el.innerText = `${prefix}${target.toLocaleString()}${suffix}`;
            }
        };

        updateCount();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStat(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => observer.observe(stat));

    // Smooth Scroll for Navigation
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            mobileToggle.classList.toggle('toggle-active');
        });

        // Close menu when link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                mobileToggle.classList.remove('toggle-active');
            });
        });
    }
});
