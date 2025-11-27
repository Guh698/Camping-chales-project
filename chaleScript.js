gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  Draggable,
  InertiaPlugin,
  MorphSVGPlugin,
  Flip
);

document.addEventListener("DOMContentLoaded", () => {
  gsap.to(".transition", {
    y: "-100%",
    duration: 1.3,
    ease: "power4.inOut",
    delay: 0.7,
  });
  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1,
    effects: true,
  });

  ScrollTrigger.matchMedia({
    "(min-width: 1024px)": function () {
      let desktopImgsTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".chale-presentation",
          start: "center center",
          end: "+=3000",
          pin: true,
          scrub: true,
        },
      });

      desktopImgsTl.to(".img2", {
        y: 0,
        duration: 0.7,
        ease: "power2.inOut",
      });

      desktopImgsTl.to(
        ".img3",
        {
          y: 0,
          duration: 0.7,
          ease: "power2.inOut",
        },
        "-=.3"
      );
    },
    "(max-width: 1024px)": function () {
      let imgsTl = gsap.timeline({ repeat: -1 });

      imgsTl.to(".img1", {
        x: "-100%",
        duration: 0.7,
        ease: "power2.inOut",
        delay: 1.7,
      });

      imgsTl.to(
        ".img2",
        {
          x: 0,
          duration: 0.7,
          ease: "power2.inOut",
        },
        "<"
      );

      imgsTl.set(".img1", {
        x: "100%",
      });

      imgsTl.to(
        ".img2",
        {
          x: "-100%",
          duration: 0.7,
          ease: "power2.inOut",
          delay: 1.7,
        },
        "<"
      );

      imgsTl.to(
        ".img3",
        {
          x: 0,
          duration: 0.7,
          ease: "power2.inOut",
        },
        "<"
      );

      imgsTl.to(
        ".img3",
        {
          x: "-100%",
          duration: 0.7,
          ease: "power2.inOut",
          delay: 1.7,
        },
        "<"
      );

      imgsTl.to(
        ".img1",
        {
          x: 0,
          duration: 0.7,
          ease: "power2.inOut",
        },
        "<"
      );
    },
  });

  const links = document.querySelectorAll(".link");

  links.forEach((link) => {
    let upperLink = link.querySelector(".upper-link");
    let lowerLink = link.querySelector(".lower-link");

    let splitUpper = new SplitText(upperLink, {
      type: "words, chars",
    });
    let splitLower = new SplitText(lowerLink, {
      type: "words, chars",
    });

    let charLinks = splitUpper.chars;
    let charLinks2 = splitLower.chars;

    gsap.set(charLinks, { y: 0 });
    gsap.set(charLinks2, { y: "150%" });

    link.addEventListener("mouseenter", () => {
      gsap.to(charLinks, {
        scale: 1.1,
        y: "-100%",
        duration: 0.3,
        stagger: {
          each: 0.02,
          from: "left",
        },
      });

      gsap.to(charLinks2, {
        scale: 1.1,
        y: "0",
        duration: 0.3,
        stagger: {
          each: 0.02,
          from: "left",
        },
      });
    });

    link.addEventListener("mouseleave", () => {
      gsap.to(charLinks, {
        scale: 1,
        y: "0",
        duration: 0.3,
        stagger: {
          each: 0.02,
          from: "left",
        },
      });

      gsap.to(charLinks2, {
        scale: 1,
        y: "150%",
        duration: 0.3,
        stagger: {
          each: 0.02,
          from: "left",
        },
      });
    });
  });
});
