(function ($) {
  "use strict";

  function updateActiveNav(element) {
    $(".nav-menu .active, .mobile-nav .active").removeClass("active");
    element.closest("li").addClass("active");
  }

  function updateSectionShow(hash) {
    $("section").removeClass("section-show");
    $(hash).addClass("section-show");
  }

  function toggleMobileNavActive() {
    $("body").toggleClass("mobile-nav-active");
    $(".mobile-nav-toggle i").toggleClass(
      "icofont-navigation-menu icofont-close"
    );
    $(".mobile-nav-overly").toggle();
  }

  $(document).on("click", ".nav-menu a, .mobile-nav a", function (e) {
    if (
      location.pathname.replace(/^\//, "") ===
        this.pathname.replace(/^\//, "") &&
      location.hostname === this.hostname
    ) {
      const hash = this.hash;
      const target = $(hash);

      if (target.length) {
        e.preventDefault();
        if ($(this).parents(".nav-menu, .mobile-nav").length)
          updateActiveNav($(this));

        if (hash === "#header") {
          $("#header").removeClass("header-top");
          updateSectionShow(hash);
          return;
        }

        if (!$("#header").hasClass("header-top")) {
          $("#header").addClass("header-top");
          setTimeout(() => updateSectionShow(hash), 350);
        } else {
          updateSectionShow(hash);
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $(".mobile-nav-toggle i").toggleClass(
            "icofont-navigation-menu icofont-close"
          );
          $(".mobile-nav-overly").fadeOut();
        }

        return false;
      }
    }
  });

  if ($(".nav-menu").length) {
    const $mobile_nav = $(".nav-menu").clone().prop({
      class: "mobile-nav d-lg-none",
    });
    $("body").append(
      $mobile_nav,
      '<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>',
      '<div class="mobile-nav-overly"></div>'
    );

    $(document)
      .on("click", ".mobile-nav-toggle", toggleMobileNavActive)
      .click(function (e) {
        const container = $(".mobile-nav, .mobile-nav-toggle");
        if (
          !container.is(e.target) &&
          container.has(e.target).length === 0 &&
          $("body").hasClass("mobile-nav-active")
        ) {
          toggleMobileNavActive();
          $(".mobile-nav-overly").fadeOut();
        }
      });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }
})(jQuery);
