
const gallery = [
  { link: "./images/IMG_1.jpg", alt: "Перманентый макияж" },
  { link: "./images/IMG_3.jpg", alt: "Оформление бровей" },
  { link: "./images/lami.jpg", alt: "Ламинирование ресниц" },
  { link: "./images/IMG_4.jpg", alt: "Наращивание ресниц" },
  { link: "./images/IMG_2.jpg", alt: "Окрашивание ресниц" },
];
const servicesFile = "./pages/services.txt";
const priceFile = "./pages/price.txt";

window.addEventListener("DOMContentLoaded", () => {
  createGallery(gallery);
  setButtonsEvent();
  burgerAction();
  animation();
});
//присвоим всем кнопкам обработчики
function setButtonsEvent() {
  const sButton = document.querySelector(".header__button");
  const saButton = document.querySelector(".main__button");
  const finalStr = takeStr();

  sButton.addEventListener("click", function () {
    window.open(finalStr, "_blank");
  });
  saButton.addEventListener("click", function () {
    window.open(finalStr, "_blank");
  });
}

function takeStr() {
  var hash = 0,
    i,
    chr;
  let str =
    "01101000011101000111010001110000011100110011101000101111001011110111011101100001001011100110110101100101001011110011011100111001001110010011100100110000001100110011100000110110001101000011000100111001";
  let arr = str.match(/.{1,8}/g);
  if (str.length === 0) return hash;
  hash = arr.map((item) => String.fromCharCode(parseInt(item, 2))).join("");
  return hash;
}
function burgerAction() {
  const burgerCheckbox = document.querySelector(".burger__toggle");
  const burgerItems = document.querySelectorAll(".burger__item");
  burgerItems.forEach((element) => {
    element.addEventListener("click", (e) => {
      burgerCheckbox.checked = false;
    });
  });
}
function animation() {
  gsap.registerPlugin(ScrollTrigger);

  const tlTitle = gsap.timeline({});
  tlTitle.from(".main__title", {
    duration: 1,
    ease: "back.out(1.7)",
    x: -250,
  });
  tlTitle.from(
    ".main__title-text",
    {
      duration: 1,
      ease: "back.out(1.7)",
      x: 250,
    },
    "<"
  );
  if (document.documentElement.clientWidth > 700) {
    tlTitle.from(".main__title", { duration: 3, color: "#f3f0f4" }, "<");
    tlTitle.from(".main__title-text", { duration: 3, color: "#f3f0f4" }, "<");
  }
  tlTitle.from(".main__address-box", { duration: 2, scale: 0.5 }, "<");

  gsap
    .timeline({
      defaults: {
        ease: "none",
      },
      scrollTrigger: {
        trigger: ".services__title",
        start: "top bottom",
        end: "+=50",
        pin: true,
        scrub: 1,
      },
    })
    .from(".services__title", {
      x: -250,
    });

  gsap
    .timeline({
      defaults: {
        ease: "none",
      },
      scrollTrigger: {
        trigger: ".price__title",
        start: "top bottom",
        end: "+=50",
        pin: true,
        scrub: 1,
      },
    })
    .from(".price__title", {
      x: -250,
    });

  gsap
    .timeline({
      defaults: {
        ease: "none",
      },
      scrollTrigger: {
        trigger: ".contacts__title",
        start: "top bottom",
        end: "+=50",
        pin: true,
        scrub: 1,
      },
    })
    .from(".contacts__title", {
      x: -250,
    });

  gsap
    .timeline({
      defaults: {
        ease: "none",
      },
      scrollTrigger: {
        trigger: ".portfolio__title",
        start: "top bottom",
        end: "+=50",
        pin: true,
        scrub: 1,
      },
    })
    .from(".portfolio__title", {
      x: -250,
    });

  let tl = gsap.timeline();
  let marquee = document.querySelector(".gallery");
  let content = document.querySelector(".gallery__content");
  let items = document.querySelectorAll(".gallery__item");
  let tlLength = items.length * 2;

  // animation timeline
  tl.to(".gallery__content", tlLength, {
    xPercent: -100,
    repeat: -1,
    ease: "none",
  });

  let currentScale = 1;
  let scaleTl;

  // scroll trigger
  ScrollTrigger.create({
    markers: false,
    trigger: marquee,
    onUpdate: (self) => {
      if (self.direction == 1) {
        isUpdated = true;
        let tScale = self.getVelocity() / 400;
        if (tScale > currentScale) {
          currentScale = tScale;
          scaleTl && scaleTl.kill();
          scaleTl = gsap
            .timeline({
              deafults: {
                ease: "power2.out",
              },
              onComplete: () => {
                currentScale = 1;
                scaleTl.kill();
              },
            })
            .to(tl, {
              duration: 0.2,
              timeScale: tScale,
              ease: "power2.out",
            })
            .to(
              tl,
              {
                timeScale: 1,
                duration: 1,
                ease: "none",
              },
              "+=1"
            );
        }
      }
    },
  });
}

function createGallery(galleryArray){
  const galleryParent=document.querySelector('.gallery');

  for (let i=0;i<2;i++){
    const div= createDiv('gallery__content');
    galleryArray.forEach(it=>{
      div.appendChild(createImage(it,'gallery__item'));
    });
    galleryParent.appendChild(div);
  }
}

function createImage(item,className) {
  const img = new Image();
  img.src = item.link;
  img.alt = item.alt;
  img.classList.add(className);
  return img;
}
function createDiv(className) {
  const div = document.createElement("div");
  div.classList.add(className);
  return div;
}

