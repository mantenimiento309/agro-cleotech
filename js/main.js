function loadComponent(id, file, callback) {
    fetch(file)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback();
        });
}

document.addEventListener("DOMContentLoaded", () => {
    loadComponent("navbar-container", "components/navbar.html", initSidebar);
    loadComponent("footer-container", "components/footer.html");
    initAccordion();
    initSmoothScroll();
    initModalOutsideClick();
    initReveal();
});

function initSidebar() {
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    if (!menuToggle || !sidebar) return;
    menuToggle.addEventListener("click", () => {
        sidebar.classList.toggle("active");
    });
    document.addEventListener("click", (e) => {
        if (
            sidebar.classList.contains("active") &&
            !sidebar.contains(e.target) &&
            !menuToggle.contains(e.target)
        ) {
            sidebar.classList.remove("active");
        }
    });
}

function openModal(tipo = "default") {
    const modal = document.getElementById("modal");
    const title = document.getElementById("modal-title");
    const text = document.getElementById("modal-text");
    if (!modal || !title || !text) return;
    switch (tipo) {
        case "reto":
            title.innerText = "El reto agrícola";
            text.innerText =
                "La baja productividad, el cambio climático y el limitado acceso a tecnología afectan directamente la eficiencia del sector agrícola.";
            break;
        case "proyecto":
            title.innerText = "Agro CLEO Tech";
            text.innerText =
                "Solución tecnológica basada en inteligencia artificial y datos satelitales que permite optimizar cultivos, reducir costos y mejorar la toma de decisiones.";
            break;
        default:
            title.innerText = "Información";
            text.innerText = "Contenido no disponible.";
            break;
    }
    modal.style.display = "flex";
}

function closeModal() {
    const modal = document.getElementById("modal");
    if (modal) modal.style.display = "none";
}

function initModalOutsideClick() {
    window.addEventListener("click", (e) => {
        const modal = document.getElementById("modal");
        if (modal && e.target === modal) {
            modal.style.display = "none";
        }
    });
}

function initAccordion() {
    const accBtns = document.querySelectorAll(".accordion-btn");
    accBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            const content = btn.nextElementSibling;
            document.querySelectorAll(".accordion-content").forEach(item => {
                if (item !== content) item.style.display = "none";
            });
            content.style.display =
                content.style.display === "block" ? "none" : "block";
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}

function initReveal() {
    const reveals = document.querySelectorAll(".reveal");
    if (!reveals.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    reveals.forEach(el => observer.observe(el));
}
