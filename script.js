document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    let currentIndex = 0;
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            navbar.style.opacity = 1;
        } else if (currentScroll > lastScroll) {
            navbar.style.opacity = 0;
        } else {
            navbar.style.opacity = 1;
        }
        lastScroll = currentScroll;
    });
    
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
    
            ticking = true;
        }
    });
    
    function scrollToSection(index) {
        sections[index].scrollIntoView({ behavior: 'smooth' });
    }

    function handleScroll() {
        const scrollPosition = window.scrollY;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const isVisible = scrollPosition + window.innerHeight * 0.7 >= sectionTop && scrollPosition <= sectionTop + sectionHeight;
            if (isVisible && currentIndex !== index) {
                currentIndex = index;
                section.classList.add('active');
            }
        });

        if (scrollPosition > lastScroll) {
            document.querySelector('.popup').style.opacity = '1';
        } else {
            document.querySelector('.popup').style.opacity = '0';
        }
        lastScroll = scrollPosition;
    }

    function handleNavClick(e, index) {
        e.preventDefault();
        currentIndex = index;
        scrollToSection(currentIndex);
        sections[index].classList.add('active');
    }

    document.addEventListener('scroll', handleScroll);

    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach((link, i) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetIndex = Array.from(sections).findIndex(section => section.getAttribute('id') === targetId);
            currentIndex = targetIndex;
            scrollToSection(currentIndex);
            sections[targetIndex].classList.add('active');
        });
    });
});
