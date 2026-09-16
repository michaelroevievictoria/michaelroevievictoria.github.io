const { animate, stagger } = window.Motion;

const MOTION = !window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

const FINE_POINTER = window.matchMedia(
  "(pointer: fine)"
).matches;

// Stable easing curves for browser/CDN version of Motion
const softEase = [0.22, 1, 0.36, 1];
const snappyEase = [0.16, 1, 0.3, 1];
/* =========================================================
   DOM READY
========================================================= */

function whenReady() {
  if (document.readyState === "loading") {
    return new Promise((resolve) => {
      document.addEventListener("DOMContentLoaded", resolve, {
        once: true,
      });
    });
  }

  return Promise.resolve();
}

/* =========================================================
   LOADER
========================================================= */

function dismissLoader(loader) {
  if (!loader) return;

  document.documentElement.classList.remove("site-loading");

  loader.classList.add("is-hidden");
  loader.setAttribute("aria-hidden", "true");

  if (MOTION) {
    animate(
      loader,
      {
        opacity: [1, 0],
        y: [0, -24],
      },
      {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }
    );
  } else {
    loader.style.opacity = "0";
  }

  window.setTimeout(
    () => {
      loader.remove();
    },
    MOTION ? 650 : 0
  );
}

function runLoader() {
    return new Promise((resolve) => {

        const loader =
            document.getElementById("site-loader");

        if (!loader) {
            resolve();
            return;
        }

        const box =
            loader.querySelector(".splash-box");

        const progress =
            loader.querySelector(".splash-progress");

        const percent =
            loader.querySelector(".splash-percent");

        const background =
            loader.querySelector(".splash-background");


        if (!box || !progress) {
            loader.remove();
            resolve();
            return;
        }


        /* -----------------------------------------
           Loader configuration
        ----------------------------------------- */

        const duration = 2200;

        const colors = [
            "#9C27B0",
            "#6C4DFF",
            "#2196F3",
            "#00BCD4",
            "#FFB300",
            "#FF5A5F"
        ];

        const startTime = performance.now();


        /* -----------------------------------------
           Animation
        ----------------------------------------- */

        function animateLoader(currentTime) {

            const elapsed =
                currentTime - startTime;

            const rawProgress =
                Math.min(elapsed / duration, 1);


            /*
             * Smooth acceleration / deceleration
             */

            const eased =
                1 -
                Math.pow(
                    1 - rawProgress,
                    3
                );


            const progressValue =
                eased * 100;


            /* Move box */

            box.style.left =
                `${progressValue}%`;


            /* Progress line */

            progress.style.width =
                `${progressValue}%`;


            /* Percentage */

            if (percent) {
                percent.textContent =
                    `${Math.round(progressValue)}%`;
            }


            /* -------------------------------------
               Change colors as box moves
            ------------------------------------- */

            const colorIndex =
                Math.min(
                    Math.floor(
                        rawProgress *
                        colors.length
                    ),
                    colors.length - 1
                );

            const currentColor =
                colors[colorIndex];


            box.style.backgroundColor =
                currentColor;

            box.style.boxShadow =
                `0 0 18px ${currentColor},
                 0 0 45px ${currentColor}55`;


            /* -------------------------------------
               Background follows box
            ------------------------------------- */

            if (background) {

                background.style.setProperty(
                    "--loader-x",
                    `${progressValue}%`
                );

            }


            /* Continue */

            if (rawProgress < 1) {

                requestAnimationFrame(
                    animateLoader
                );

                return;
            }


            /* -------------------------------------
               Loading finished
            ------------------------------------- */

            loader.classList.add(
                "is-completing"
            );


            setTimeout(() => {

                loader.classList.add(
                    "is-leaving"
                );


                setTimeout(() => {

                    loader.remove();

                    document.documentElement
                        .classList.remove(
                            "site-loading"
                        );

                    resolve();

                }, 900);

            }, 250);
        }


        requestAnimationFrame(
            animateLoader
        );


        /* -----------------------------------------
           Safety fallback
        ----------------------------------------- */

        setTimeout(() => {

            if (
                document.body.contains(loader)
            ) {

                loader.remove();

                document.documentElement
                    .classList.remove(
                        "site-loading"
                    );

                resolve();
            }

        }, 5000);

    });
}

/* =========================================================
   HERO ANIMATION
========================================================= */

function initHeroEntrance() {
  const center = document.querySelector(
    ".page-header .content-center"
  );

  if (!center) return;

  const imageWrap = center.querySelector(".cc-profile-image");
  const title = center.querySelector(".h2.title");
  const subtitle = center.querySelector(".category");

  const buttons = [
    ...center.querySelectorAll(".btn"),
  ];

  const targets = [
    imageWrap,
    title,
    subtitle,
    ...buttons,
  ].filter(Boolean);

  targets.forEach((element) => {
    element.classList.add("hero-motion-target");
  });

  /*
   * Reduced motion:
   * make everything immediately visible.
   */

  if (!MOTION) {
    targets.forEach((element) => {
      element.style.opacity = "1";
      element.style.transform = "none";
    });

    return;
  }

  /* Profile image */

  if (imageWrap) {
    animate(
      imageWrap,
      {
        opacity: [0, 1],
        scale: [0.88, 1],
        rotate: [-4, 0],
      },
      {
        duration: 0.75,
        delay: 0.12,
        ease: softSpring,
      }
    );
  }

  /* Text + buttons */

  const textAndButtons = [
    title,
    subtitle,
    ...buttons,
  ].filter(Boolean);

  if (textAndButtons.length) {
    animate(
      textAndButtons,
      {
        opacity: [0, 1],
        y: [24, 0],
      },
      {
        delay: stagger(0.09, {
          start: 0.28,
        }),
        duration: 0.6,
        ease: softSpring,
      }
    );
  }
}

/* =========================================================
   CUSTOM CURSOR
========================================================= */

function initCursor() {
  if (!MOTION || !FINE_POINTER) return;

  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");

  if (!dot || !ring) return;

  document.documentElement.classList.add("has-custom-cursor");

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let ringX = mouseX;
  let ringY = mouseY;

  let cursorVisible = false;

  /* -----------------------------------------
     Mouse movement
  ----------------------------------------- */

  document.addEventListener(
    "mousemove",
    (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      /* Dot follows mouse exactly */
      dot.style.transform =
        `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      if (!cursorVisible) {
        cursorVisible = true;

        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    },
    { passive: true }
  );

  /* -----------------------------------------
     Smooth ring movement
  ----------------------------------------- */

  function renderCursor() {
    /*
     * Lower = smoother/slower
     * Higher = faster/snappier
     *
     * 0.16 gives a premium trailing effect.
     */

    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;

    ring.style.transform =
      `translate3d(${ringX}px, ${ringY}px, 0)`;

    requestAnimationFrame(renderCursor);
  }

  requestAnimationFrame(renderCursor);

  /* -----------------------------------------
     Interactive elements
  ----------------------------------------- */

  const interactiveSelector = [
    "a",
    "button",
    ".btn",
    "input",
    "textarea",
    "select",
    ".nav-link",
    ".cc-porfolio-image",
    "[role='button']",
  ].join(",");

  document
    .querySelectorAll(interactiveSelector)
    .forEach((element) => {

      element.addEventListener("mouseenter", () => {
        ring.classList.add("is-hovering");
      });

      element.addEventListener("mouseleave", () => {
        ring.classList.remove("is-hovering");
      });

    });

  /* -----------------------------------------
     Click feedback
  ----------------------------------------- */

  document.addEventListener("mousedown", () => {
    ring.classList.add("is-clicking");
  });

  document.addEventListener("mouseup", () => {
    ring.classList.remove("is-clicking");
  });

  /* -----------------------------------------
     Enter / leave browser
  ----------------------------------------- */

  document.addEventListener("mouseleave", () => {
    cursorVisible = false;

    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });

  document.addEventListener("mouseenter", () => {
    cursorVisible = true;

    dot.style.opacity = "1";
    ring.style.opacity = "1";
  });
}

/* =========================================================
   NAVIGATION ENTRANCE
========================================================= */

function initNavReveal() {
  const nav = document.querySelector(".navbar-nav");

  if (!nav || !MOTION) return;

  const items = nav.querySelectorAll(".nav-item");

  if (!items.length) return;

  animate(
    items,
    {
      opacity: [0, 1],
      x: [-12, 0],
    },
    {
      delay: stagger(0.06, {
        start: 0.45,
      }),
      duration: 0.45,
      ease: snappySpring,
    }
  );
}

/* =========================================================
   AOS
========================================================= */

function refreshAos() {
  if (
    typeof window.AOS !== "undefined" &&
    typeof window.AOS.refreshHard === "function"
  ) {
    window.AOS.refreshHard();
  }
}

/* =========================================================
   FAILSAFE
========================================================= */

/*
 * Even if something unexpected happens,
 * never allow the loader to block the portfolio forever.
 */

const loaderFailsafe = window.setTimeout(() => {
  const loader = document.getElementById("site-loader");

  if (loader) {
    console.warn(
      "[motion-ui] Loader failsafe triggered."
    );

    loader.remove();

    document.documentElement.classList.remove(
      "site-loading"
    );
  }
}, 4000);

/* =========================================================
   BOOTSTRAP
========================================================= */

(async function bootstrap() {
  try {
    await whenReady();

    /*
     * Cursor can initialize while loader is visible.
     */
    initCursor();

    /*
     * Run loader first.
     */
    await runLoader();

    /*
     * Loader successfully finished,
     * so failsafe isn't needed anymore.
     */
    clearTimeout(loaderFailsafe);

    /*
     * Animate actual website.
     */
    initHeroEntrance();
    initNavReveal();

    /*
     * Recalculate AOS positions after loader removal.
     */
    refreshAos();
  } catch (error) {
    console.error("[motion-ui]", error);

    /*
     * Critical fallback:
     * NEVER leave the portfolio hidden.
     */

    const loader =
      document.getElementById("site-loader");

    if (loader) {
      loader.remove();
    }

    document.documentElement.classList.remove(
      "site-loading"
    );

    document
      .querySelectorAll(".hero-motion-target")
      .forEach((element) => {
        element.style.opacity = "1";
        element.style.transform = "none";
      });
  }
})();