/*==========================================================
  PORTFOLIO V4
  script.js
  PART 1A
  Loader + Scroll Progress
==========================================================*/

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // Initialize Lucide Icons
    if (window.lucide) {
        lucide.createIcons();
    }

    const body = document.body;
    const loader = document.querySelector(".loader");
    const progressBar = document.querySelector(".scroll-progress");

    // Prevent scrolling while loading
    body.classList.add("loading");

    // ===============================
    // Loader
    // ===============================
    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {
                loader.classList.add("hide");
            }

            body.classList.remove("loading");

        }, 700);

    });

    // ===============================
    // Scroll Progress
    // ===============================
    let ticking = false;

    function updateProgress() {

        const scrollTop = window.pageYOffset;
        const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress =
            docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

        ticking = false;
    }

    window.addEventListener(
        "scroll",
        () => {
            if (!ticking) {
                window.requestAnimationFrame(updateProgress);
                ticking = true;
            }
        },
        { passive: true }
    );

    updateProgress();

});
/*==========================================================
  PART 1B
  Sticky Header + Mobile Menu
==========================================================*/

const header = document.querySelector(".header");
const menuBtn = document.getElementById("menuBtn");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".nav-links a");

// ===============================
// Sticky Header
// ===============================

function updateHeader() {
    if (!header) return;

    if (window.scrollY > 40) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

updateHeader();

window.addEventListener(
    "scroll",
    () => requestAnimationFrame(updateHeader),
    { passive: true }
);

// ===============================
// Mobile Menu
// ===============================

if (menuBtn && navbar) {

    menuBtn.addEventListener("click", () => {

        navbar.classList.toggle("active");
        menuBtn.classList.toggle("active");

        const icon = menuBtn.querySelector("i");

        if (icon) {
            icon.setAttribute(
                "data-lucide",
                navbar.classList.contains("active") ? "x" : "menu"
            );

            if (window.lucide) {
                lucide.createIcons();
            }
        }
    });

}

// ===============================
// Close Menu On Link Click
// ===============================

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navbar?.classList.remove("active");
        menuBtn?.classList.remove("active");

        const icon = menuBtn?.querySelector("i");

        if (icon) {
            icon.setAttribute("data-lucide", "menu");

            if (window.lucide) {
                lucide.createIcons();
            }
        }

    });

});

// ===============================
// Outside Click Close
// ===============================

document.addEventListener("click", (e) => {

    if (
        navbar &&
        menuBtn &&
        navbar.classList.contains("active") &&
        !navbar.contains(e.target) &&
        !menuBtn.contains(e.target)
    ) {

        navbar.classList.remove("active");
        menuBtn.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        if (icon) {
            icon.setAttribute("data-lucide", "menu");

            if (window.lucide) {
                lucide.createIcons();
            }
        }

    }

});

// ===============================
// ESC Key Close
// ===============================

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape" && navbar?.classList.contains("active")) {

        navbar.classList.remove("active");
        menuBtn?.classList.remove("active");

        const icon = menuBtn?.querySelector("i");

        if (icon) {
            icon.setAttribute("data-lucide", "menu");

            if (window.lucide) {
                lucide.createIcons();
            }
        }

    }

});

// ===============================
// Reset On Desktop
// ===============================

window.addEventListener("resize", () => {

    if (window.innerWidth > 768 && navbar) {

        navbar.classList.remove("active");
        menuBtn?.classList.remove("active");

        const icon = menuBtn?.querySelector("i");

        if (icon) {
            icon.setAttribute("data-lucide", "menu");

            if (window.lucide) {
                lucide.createIcons();
            }
        }

    }

});
/*==========================================================
  PART 2A
  Dark / Light Mode + Active Navigation
==========================================================*/

// ===============================
// Theme Toggle
// ===============================

const themeToggle = document.getElementById("themeToggle");
const THEME_KEY = "portfolio-theme";

function applyTheme(theme) {

    document.body.classList.toggle("dark", theme === "dark");

    const icon = themeToggle?.querySelector("i");

    if (icon) {

        icon.setAttribute(
            "data-lucide",
            theme === "dark" ? "sun" : "moon"
        );

        if (window.lucide) {
            lucide.createIcons();
        }

    }

}

// Load Saved Theme
const savedTheme = localStorage.getItem(THEME_KEY);

if (savedTheme) {

    applyTheme(savedTheme);

} else {

    const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;

    applyTheme(prefersDark ? "dark" : "light");

}

// Toggle Theme
themeToggle?.addEventListener("click", () => {

    const isDark = document.body.classList.contains("dark");

    const newTheme = isDark ? "light" : "dark";

    applyTheme(newTheme);

    localStorage.setItem(THEME_KEY, newTheme);

});

// ===============================
// Active Navigation
// ===============================

const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {

    const scrollY = window.pageYOffset;

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollY >= sectionTop &&
            scrollY < sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {

                link.classList.remove("active");

                if (
                    link.getAttribute("href") === "#" + sectionId
                ) {
                    link.classList.add("active");
                }

            });

        }

    });

}

updateActiveNav();

window.addEventListener(
    "scroll",
    () => requestAnimationFrame(updateActiveNav),
    { passive: true }
);
/*==========================================================
  PART 2B
  Reveal on Scroll + Counter Animation
==========================================================*/

// ===============================
// Reveal Animation
// ===============================

const revealElements = document.querySelectorAll(`
.section-title,
.hero-content,
.hero-image,
.about-grid,
.skill-card,
.service-card,
.project-card,
.timeline-item,
.stat-card,
.testimonial-card,
.faq-item,
.contact-card,
.contact-form
`);

const revealObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            entry.target.classList.add("show");

            observer.unobserve(entry.target);

        });

    },
    {
        threshold: 0.15,
        rootMargin: "0px 0px -60px 0px"
    }
);

revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});

// ===============================
// Counter Animation
// ===============================

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(

    (entries, observer) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.target);

            let current = 0;
            const duration = 1500;
            const increment = target / (duration / 16);

            function updateCounter() {

                current += increment;

                if (current < target) {

                    counter.textContent = Math.ceil(current);

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.textContent = target;

                }

            }

            updateCounter();

            observer.unobserve(counter);

        });

    },
    {
        threshold: 0.5
    }

);

counters.forEach(counter => {

    counterObserver.observe(counter);

});
/*==========================================================
  PART 3A
  FAQ Accordion
==========================================================*/

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {

    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    const icon = question.querySelector("i");

    answer.style.maxHeight = "0px";
    answer.style.overflow = "hidden";

    question.addEventListener("click", () => {

        const isOpen = item.classList.contains("active");

        // Close all FAQs
        faqItems.forEach((faq) => {

            faq.classList.remove("active");

            const faqAnswer = faq.querySelector(".faq-answer");
            const faqIcon = faq.querySelector(".faq-question i");

            faqAnswer.style.maxHeight = "0px";

            if (faqIcon) {
                faqIcon.setAttribute("data-lucide", "plus");
            }

        });

        // Open current FAQ
        if (!isOpen) {

            item.classList.add("active");

            answer.style.maxHeight = answer.scrollHeight + "px";

            if (icon) {
                icon.setAttribute("data-lucide", "minus");
            }

        }

        if (window.lucide) {
            lucide.createIcons();
        }

    });

});
/*==========================================================
  PART 3B
  Smooth Scrolling + Final Optimization
==========================================================*/

// ===============================
// Smooth Scroll
// ===============================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (!target) return;

        e.preventDefault();

        const headerHeight =
            document.querySelector(".header")?.offsetHeight || 0;

        const targetPosition =
            target.offsetTop - headerHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});

// ===============================
// Refresh Lucide Icons
// ===============================

window.addEventListener("load", () => {

    if (window.lucide) {
        lucide.createIcons();
    }

});

// ===============================
// Prevent Form Reload
// ===============================

const contactForm = document.querySelector(".contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", (e) => {

        e.preventDefault();

        alert("Thank you! Your message has been received.");

        contactForm.reset();

    });

}

// ===============================
// Image Lazy Loading
// ===============================

document.querySelectorAll("img").forEach(img => {
    img.loading = "lazy";
    img.decoding = "async";
});

/*==============================
Back To Top
==============================*/

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

}, { passive: true });

backToTop?.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
/*==========================================================
  PART 3C
  Project Filter
==========================================================*/

// ===============================
// Project Filter
// ===============================

const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

if (filterButtons.length && projectCards.length) {

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            // Active button
            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filterValue = button.dataset.filter;

            projectCards.forEach(card => {

                const category = card.dataset.category;

                if (filterValue === "all" || category === filterValue) {

                    card.style.display = "block";

                    requestAnimationFrame(() => {
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    });

                } else {

                    card.style.opacity = "0";
                    card.style.transform = "translateY(20px)";

                    setTimeout(() => {
                        card.style.display = "none";
                    }, 250);

                }

            });

        });

    });

}
/*==========================================================
  PART 4A
  Testimonial Slider
==========================================================*/

const testimonialCards = document.querySelectorAll(".testimonial-card");
const nextBtn = document.getElementById("nextTestimonial");
const prevBtn = document.getElementById("prevTestimonial");

if (testimonialCards.length && nextBtn && prevBtn) {

    let current = 0;

    function showTestimonial(index) {

        testimonialCards.forEach(card => {
            card.classList.remove("active");
        });

        testimonialCards[index].classList.add("active");
    }

    showTestimonial(current);

    nextBtn.addEventListener("click", () => {
        current = (current + 1) % testimonialCards.length;
        showTestimonial(current);
    });

    prevBtn.addEventListener("click", () => {
        current = (current - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(current);
    });

    setInterval(() => {
        current = (current + 1) % testimonialCards.length;
        showTestimonial(current);
    }, 5000);

}
/*==============================
  Typing Effect
==============================*/

const typingElement = document.querySelector(".typing");

if (typingElement) {

    const words = [
        "Web Developer",
        "Frontend Developer",
        "UI Designer",
        "Freelancer"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (!deleting) {
            typingElement.textContent = currentWord.substring(0, charIndex++);
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex--);
        }

        let speed = deleting ? 60 : 120;

        if (!deleting && charIndex > currentWord.length) {
            deleting = true;
            speed = 1500;
        }

        if (deleting && charIndex < 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 300;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();
}
document.addEventListener("DOMContentLoaded", () => {
    if (window.lucide) {
        lucide.createIcons();
    }
});