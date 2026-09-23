(function () {
  var hamburger = document.getElementById("hamburger");
  var mobileMenu = document.getElementById("mobileMenu");

  function setMenuOpen(open) {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.toggle("open", open);
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      mobileMenu.removeAttribute("hidden");
    } else {
      mobileMenu.setAttribute("hidden", "");
    }
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener("click", function () {
      setMenuOpen(mobileMenu.hasAttribute("hidden"));
    });

    mobileMenu.addEventListener("click", function (e) {
      if (e.target && e.target.closest && e.target.closest("a")) {
        setMenuOpen(false);
      }
    });

    document.addEventListener("click", function (e) {
      if (!e.target || !e.target.closest) return;
      if (!e.target.closest(".main-header")) {
        setMenuOpen(false);
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setMenuOpen(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) setMenuOpen(false);
    });
  }

  var path = window.location.pathname.replace(/\/+$/, "") || "/";
  var links = document.querySelectorAll(".nav-menu a[href], .nav-mobile a[href], .app-link[href], .league-grid a[href]");
  for (var i = 0; i < links.length; i++) {
    var href = links[i].getAttribute("href");
    if (!href || href.charAt(0) !== "/") continue;
    var norm = href.replace(/\/+$/, "") || "/";
    if (norm === path) {
      links[i].classList.add("active");
      links[i].setAttribute("aria-current", "page");
    }
  }
})();
