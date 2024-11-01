document.addEventListener("DOMContentLoaded", () => {
  const selectAll = (selector) => Array.from(document.querySelectorAll(selector));
  const select = (selector) => document.querySelector(selector);

  const setActiveNav = (element) => {
    selectAll(".nav-menu .active, .mobile-nav .active").forEach((el) => el.classList.remove("active"));
    element.closest("li").classList.add("active");
  };

  const showSection = (hash) => {
    selectAll("section").forEach((section) => section.classList.remove("section-show"));
    select(hash)?.classList.add("section-show");
  };

  const toggleMobileNav = () => {
    document.body.classList.toggle("mobile-nav-active");
    const icon = select(".mobile-nav-toggle i");
    icon.classList.toggle("icofont-navigation-menu");
    icon.classList.toggle("icofont-close");

    const overlay = select(".mobile-nav-overly");
    overlay.style.display = overlay.style.display === "block" ? "none" : "block";
  };

  const handleAnchorClick = (e) => {
    if (location.pathname.replace(/^\//, "") !== e.currentTarget.pathname.replace(/^\//, "") ||
      location.hostname !== e.currentTarget.hostname) return;

    const hash = e.currentTarget.hash;
    const target = select(hash);
    if (!target) return;

    e.preventDefault();
    if (e.currentTarget.closest(".nav-menu, .mobile-nav")) setActiveNav(e.currentTarget);

    const header = select("#header");
    hash === "#header"
      ? (header.classList.remove("header-top"), showSection(hash))
      : !header.classList.contains("header-top")
        ? (header.classList.add("header-top"), setTimeout(() => showSection(hash), 350))
        : showSection(hash);

    document.body.classList.contains("mobile-nav-active") && toggleMobileNav();
  };

  const initializeMobileNav = () => {
    const navMenu = select(".nav-menu");
    if (!navMenu) return;

    const mobileNav = navMenu.cloneNode(true);
    mobileNav.className = "mobile-nav d-lg-none";
    document.body.append(mobileNav);

    const toggleButton = document.createElement("button");
    toggleButton.type = "button";
    toggleButton.className = "mobile-nav-toggle d-lg-none";
    toggleButton.innerHTML = '<i class="icofont-navigation-menu"></i>';
    document.body.append(toggleButton);

    const overlay = document.createElement("div");
    overlay.className = "mobile-nav-overly";
    document.body.append(overlay);

    toggleButton.addEventListener("click", toggleMobileNav);

    document.addEventListener("click", (e) => {
      const container = select(".mobile-nav, .mobile-nav-toggle");
      !container.contains(e.target) && document.body.classList.contains("mobile-nav-active") && toggleMobileNav();
    });
  };

  const hideMobileNavIfAbsent = () => {
    !select(".nav-menu") && select(".mobile-nav, .mobile-nav-toggle")?.style.setProperty("display", "none");
  };

  selectAll(".nav-menu a, .mobile-nav a").forEach((anchor) => anchor.addEventListener("click", handleAnchorClick));

  initializeMobileNav();
  hideMobileNavIfAbsent();
});
