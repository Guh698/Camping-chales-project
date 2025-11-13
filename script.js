gsap.registerPlugin(
  ScrollTrigger,
  ScrollSmoother,
  SplitText,
  Draggable,
  InertiaPlugin,
  MorphSVGPlugin,
  Flip
);

const WP_ENDPOINT = "https://dev-camping-college-work.pantheonsite.io/graphql";

const GQL_QUERY_HOME = `
query {
  page(id: "home", idType: URI) {
    homeContent {
      heroTitulo
      heroImagem {
        node {
          sourceUrl
        }
      }

      experienciaTexto
      experienciaImg1 { node { sourceUrl } }
      experienciaImg2 { node { sourceUrl } }
      experienciaImg3 { node { sourceUrl } }
      experienciaImg4 { node { sourceUrl } }
      experienciaImg5 { node { sourceUrl } }
      experienciaImg6 { node { sourceUrl } }

      variante1Imagem { node { sourceUrl } }
      variante1Titulo
      variante1Descricao
      variante2Imagem { node { sourceUrl } }
      variante2Titulo
      variante2Descricao
      variante3Imagem { node { sourceUrl } }
      variante3Titulo
      variante3Descricao

      cafeImage1 { node { sourceUrl } }
      cafeImage2 { node { sourceUrl } }
      cafeImage3 { node { sourceUrl } }
      cafeImage4 { node { sourceUrl } }
      cafeImage5 { node { sourceUrl } }
      cafeImage6 { node { sourceUrl } }
      cafeText
    }
  }
}
`;

document.addEventListener("DOMContentLoaded", () => {
  fetchHomePageData();
});

async function fetchHomePageData() {
  console.log("Buscando dados da Home Page no WordPress...");

  try {
    const response = await fetch(WP_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: GQL_QUERY_HOME }),
    });

    const jsonResponse = await response.json();

    const data = jsonResponse.data.page.homeContent;

    console.log("Données reçues!", data);

    renderHomePage(data);
  } catch (error) {
    console.error("Oh là là! Erro ao buscar dados da Home:", error);
    document.body.innerHTML =
      "<h1>Oops! Erro ao carregar o conteúdo. Tente mais tarde.</h1>";
  }
}

function otimizarUrlCloudinary(url, width = 400) {
  if (!url || !url.includes("/upload/")) {
    return url;
  }

  const otimizacao = `/upload/w_${width},q_auto,f_auto/`;
  return url.replace("/upload/", otimizacao);
}

function renderHomePage(data) {
  console.log("Renderizando a página...");

  const heroSection = document.getElementById("hero-section");
  const heroTitle = document.getElementById("hero-title");

  if (data.heroTitulo) {
    heroTitle.textContent = data.heroTitulo;
  }
  if (data.heroImagem) {
    let urlHeroOtimizada = otimizarUrlCloudinary(
      data.heroImagem.node.sourceUrl,
      1920
    );
    heroSection.style.backgroundImage = `url(${urlHeroOtimizada})`;
  }

  const expText = document.getElementById("experience-text");
  const expGallery = document.getElementById("experience-gallery-container");

  if (data.experienciaTexto) {
    expText.textContent = data.experienciaTexto;
  }

  expGallery.innerHTML = "";
  const camposDeImagem = [
    data.experienciaImg1,
    data.experienciaImg2,
    data.experienciaImg3,
    data.experienciaImg4,
    data.experienciaImg5,
    data.experienciaImg6,
  ];

  camposDeImagem.forEach((campoImagem, index) => {
    if (campoImagem && campoImagem.node) {
      let urlOtimizada = otimizarUrlCloudinary(campoImagem.node.sourceUrl, 450);
      expGallery.innerHTML += ` 
      <div class="experience-img-box">
        <img src="${urlOtimizada}" alt="Experiência ${index + 1}">
      </div>
      `;
    }
  });

  const coffeeGallery = document.getElementById(
    "coffee-service-gallery-container"
  );

  coffeeGallery.innerHTML = "";
  const coffeeCamposDeImagem = [
    data.cafeImage1,
    data.cafeImage2,
    data.cafeImage3,
    data.cafeImage4,
    data.cafeImage5,
    data.cafeImage6,
  ];

  coffeeCamposDeImagem.forEach((coffeeCampoDeImagem, index) => {
    if (coffeeCampoDeImagem && coffeeCampoDeImagem.node) {
      let urlOtimizada = otimizarUrlCloudinary(
        coffeeCampoDeImagem.node.sourceUrl,
        450
      );
      coffeeGallery.innerHTML += ` 
      <div class="coffee-service-img-box">
        <img src="${urlOtimizada}" alt="Coffee experience ${index + 1}">
      </div>
      `;
    }
  });

  const cafe_text = document.getElementById("cafe_text");

  if (data.cafeText) {
    cafe_text.textContent = data.cafeText;
  }

  if (data.variante1Titulo) {
    document.getElementById("variant-1-title").textContent =
      data.variante1Titulo;
    document.getElementById("variant-1-desc").textContent =
      data.variante1Descricao;
    document.getElementById("variant-1-img").src =
      data.variante1Imagem.node.sourceUrl;
  }

  if (data.variante2Titulo) {
    document.getElementById("variant-2-title").textContent =
      data.variante2Titulo;
    document.getElementById("variant-2-desc").textContent =
      data.variante2Descricao;
    document.getElementById("variant-2-img").src =
      data.variante2Imagem.node.sourceUrl;
  }

  if (data.variante3Titulo) {
    document.getElementById("variant-3-title").textContent =
      data.variante3Titulo;
    document.getElementById("variant-3-desc").textContent =
      data.variante3Descricao;
    document.getElementById("variant-3-img").src =
      data.variante3Imagem.node.sourceUrl;
  }

  const smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1,
    smoothTouch: 0.7,
    effects: true,
  });

  const splitHero = new SplitText("#hero-title", {
    type: "words, chars",
  });
  const charsHero = splitHero.chars;

  const splitExperience = new SplitText("#experience-text", {
    type: "words, chars",
  });
  const charsExperience = splitExperience.chars;

  const splitVariant1 = new SplitText("#variant-1-title", {
    type: "words, chars",
  });
  const charsVariant1 = splitVariant1.chars;

  const splitVariant2 = new SplitText("#variant-2-title", {
    type: "words, chars",
  });
  const charsVariant2 = splitVariant2.chars;

  const splitVariant3 = new SplitText("#variant-3-title", {
    type: "words, chars",
  });
  const charsVariant3 = splitVariant3.chars;

  const splitCoffeeService = new SplitText("#cafe_text", {
    type: "words, chars",
  });
  const charsCoffeeService = splitCoffeeService.chars;

  gsap.from(charsHero, {
    y: 50,
    opacity: 0,
    ease: "power4.out",
    stagger: {
      each: 0.017,
      from: "center",
    },
  });

  const experience_img_boxes = document.querySelectorAll(".experience-img-box");

  ScrollTrigger.create({
    trigger: ".experience",
    start: "top top",
    end: "bottom center",
    onEnter: () => {
      gsap.to("header nav ul li a", { color: "#000" });
    },

    onLeaveBack: () => {
      gsap.to("header nav ul li a", { color: "#fff" });
    },
  });

  let masterTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".master-wrapper",
      start: "top top",
      end: "+=3700",
      pin: true,
      scrub: true,
      ease: "none",
    },
  });

  masterTl.to(".experience", { y: 0, duration: 3 });
  masterTl.to(".hero ", { scale: 1.1, duration: 3 }, "<");
  masterTl.from(charsExperience, {
    y: 50,
    opacity: 0,
    ease: "power4.out",
    stagger: {
      each: 0.03,
      from: "center",
    },
  });
  masterTl.to(".experience-img-box:first-child", {
    y: "10vh",
    duration: 1,
  });
  masterTl.to(".experience-img-box:nth-child(2)", {
    y: "23vh",
    delay: 0.1,
    duration: 1,
  });
  masterTl.to(".experience-img-box:nth-child(3)", {
    y: "3vh",
    delay: 0.1,
    duration: 1,
  });
  masterTl.to(".experience-img-box:nth-child(4)", {
    y: "70vh",
    delay: 0.1,
    duration: 1,
  });
  masterTl.to(".experience-img-box:nth-child(5)", {
    y: "65vh",
    duration: 1,
  });
  masterTl.to(".experience-img-box:nth-child(6)", {
    y: "67vh",
    duration: 1,
  });

  ScrollTrigger.create({
    trigger: ".variants",
    start: "top top",
    end: "bottom center",
    onEnter: () => {
      gsap.to("header nav ul", { y: "-100px" });
    },
    onLeaveBack: () => {
      gsap.to("header nav ul", { y: 0 });
    },
  });

  gsap.set(charsCoffeeService, {
    y: 50,
    opacity: 0,
  });

  ScrollTrigger.create({
    trigger: ".coffee-service",
    start: "top top",
    end: "bottom center",
    onEnter: () => {
      gsap.to("header nav ul", { y: 0 });
      gsap.to(charsCoffeeService, {
        y: 0,
        opacity: 1,
        ease: "power4.out",
        stagger: {
          each: 0.017,
          from: "center",
        },
      });
    },
    onEnterBack: () => {
      gsap.to(charsCoffeeService, {
        y: 0,
        opacity: 1,
        ease: "power4.out",
        stagger: {
          each: 0.017,
          from: "center",
        },
      });
    },
    onLeaveBack: () => {
      gsap.to("header nav ul", { y: "-100px" });
      gsap.to(charsCoffeeService, {
        y: 50,
        opacity: 0,
        ease: "power4.out",
        stagger: {
          each: 0.017,
          from: "center",
        },
      });
    },
    onLeave: () => {
      gsap.to(charsCoffeeService, {
        y: 50,
        opacity: 0,
        ease: "power4.out",
        stagger: {
          each: 0.017,
          from: "center",
        },
      });
    },
  });

  ScrollTrigger.create({
    trigger: ".coffee-app",
    start: "top center",
    onEnter: () => {
      gsap.to(charsCoffeeService, {
        y: 50,
        opacity: 0,
        stagger: {
          each: 0.017,
          from: "center",
        },
      });
    },
  });

  let variantsTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".variants",
      start: "center center",
      end: "+=2700",
      pin: true,
      scrub: true,
      ease: "none",
    },
  });

  variantsTl.from(charsVariant1, {
    opacity: 0,
    y: 50,
    ease: "power4.out",
    stagger: {
      each: 0.03,
      from: "center",
    },
  });
  variantsTl.to("#variant-1-desc", { opacity: 1 }, "<");

  variantsTl.to(".variant-2-card img", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1.5,
    delay: 1,
  });

  variantsTl.from(
    charsVariant2,
    {
      opacity: 0,
      y: 50,
      ease: "power4.out",
      stagger: {
        each: 0.03,
        from: "center",
      },
    },
    "-=.5"
  );
  variantsTl.to("#variant-2-desc", { opacity: 1 }, "<");

  variantsTl.to(".variant-3-card img", {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
    duration: 1.5,
    delay: 1,
  });
  variantsTl.from(
    charsVariant3,
    {
      opacity: 0,
      y: 50,
      ease: "power4.out",
      stagger: {
        each: 0.03,
        from: "center",
      },
    },
    "-=.5"
  );
  variantsTl.to("#variant-3-desc", { opacity: 1 }, "<");

  ScrollTrigger.create({
    trigger: ".coffee-service",
    start: "top center",
    end: "bottom center",
    onEnter: () => {
      gsap.to("body", { backgroundColor: "#6b5846" });
      gsap.to("header nav ul li a", { color: "#fff" });
    },
    onEnterBack: () => {
      gsap.to("body", { backgroundColor: "#6b5846" });
      gsap.to("header nav ul li a", { color: "#fff" });
    },
    onLeave: () => {
      gsap.to("body", { backgroundColor: "#fff" });
      gsap.to("header nav ul li a", { color: "#000" });
    },
    onLeaveBack: () => {
      gsap.to("body", { backgroundColor: "#fff" });
      gsap.to("header nav ul li a", { color: "#000" });
    },
  });

  const coffeeServiceImgBox = document.querySelectorAll(
    ".coffee-service-img-box"
  );

  coffeeServiceImgBox.forEach((coffeeImgBox) => {
    const coffeIMGs = coffeeImgBox.querySelector("img");

    gsap.to(coffeIMGs, {
      y: "7%",
      scrollTrigger: {
        trigger: coffeeImgBox,
        start: "top center",
        scrub: true,
        ease: "none",
      },
    });

    gsap.to(coffeeImgBox, {
      y: "-7%",
      scrollTrigger: {
        trigger: coffeeImgBox,
        start: "top center",
        scrub: true,
        ease: "none",
      },
    });
  });

  let coffeeAppTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".coffee-app",
      start: "center center",
      end: "+=2700",
      pin: true,
      scrub: true,
      ease: "none",
    },
  });

  coffeeAppTl.to(".coffee-app-video", { rotateY: "35deg", rotateX: "17deg" });
  coffeeAppTl.to(".coffee-app-tutorial-imgs", { y: "-77%" }, "<");
}
