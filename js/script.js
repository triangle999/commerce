
const sidebar = document.querySelector("#sidebar");
const burgerButton = document.querySelector("#burgerButton");
const closeButton = document.querySelector("#closeMenu");
const overlay = document.querySelector("#sidebarOverlay");

const mobileQuery = window.matchMedia("(max-width: 1024px)");

const navLinks = document.querySelectorAll(".nav-link");

// OUVRIR LE MENU
function openMenu() {
  if (!mobileQuery.matches) return;

  sidebar.classList.add("open");
  overlay.classList.add("visible");
  document.body.classList.add("menu-open");

  sidebar.inert = false;
  sidebar.setAttribute("aria-hidden", "false");

  burgerButton.setAttribute("aria-expanded", "true");

  closeButton.focus();
}

// FERMER LE MENU
function closeMenu() {
  sidebar.classList.remove("open");
  overlay.classList.remove("visible");
  document.body.classList.remove("menu-open");

  burgerButton.setAttribute("aria-expanded", "false");

  if (mobileQuery.matches) {
    sidebar.inert = true;
    sidebar.setAttribute("aria-hidden", "true");
    burgerButton.focus();
  }
}

// ÉVÉNEMENTS
burgerButton.addEventListener("click", openMenu);
closeButton.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

// FERMER AVEC ÉCHAP
document.addEventListener("keydown", (event) => {
  if (!sidebar.classList.contains("open")) return;

  if (event.key === "Escape") {
    closeMenu();
  }

  // Gestion du focus clavier
  if (event.key === "Tab") {
    const focusable = sidebar.querySelectorAll(
      'a[href], button:not([disabled])'
    );

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === last
    ) {
      event.preventDefault();
      first.focus();
    }
  }
});

// NAVIGATION
navLinks.forEach((link) => {
  link.addEventListener("click", () => {

    navLinks.forEach((item) => {
      item.classList.remove("active");
      item.removeAttribute("aria-current");
    });

    link.classList.add("active");
    link.setAttribute("aria-current", "page");

    if (mobileQuery.matches) {
      closeMenu();
    }
  });
});

// RESPONSIVE
function handleResponsive() {
  if (mobileQuery.matches) {

    sidebar.inert = !sidebar.classList.contains("open");

    sidebar.setAttribute(
      "aria-hidden",
      String(!sidebar.classList.contains("open"))
    );

  } else {

    sidebar.classList.remove("open");
    overlay.classList.remove("visible");
    document.body.classList.remove("menu-open");

    sidebar.inert = false;
    sidebar.removeAttribute("aria-hidden");

    burgerButton.setAttribute("aria-expanded", "false");
  }
}

mobileQuery.addEventListener("change", handleResponsive);

handleResponsive();
