
window.addEventListener('DOMContentLoaded', () => {
  animation();
});


function animation (){
  gsap.registerPlugin(ScrollTrigger);

  const tlTitle=gsap.timeline({});
  tlTitle.from('.main__title', {
      duration: 1,
      ease: "back.out(1.7)",
      x: -250
  })
  tlTitle.from('.main__title-text', {
    duration: 1,
    ease: "back.out(1.7)",
    x: 250
},'<')
  tlTitle.from('.main__title', {duration: 3, color: '#f3f0f4' },'<')
  tlTitle.from('.main__title-text', {duration: 3, color: '#f3f0f4' },'<')
  tlTitle.from('.main__address-box', {duration: 2, scale: 0.5 }, '<')


  gsap.timeline({
    defaults: {
      ease: "none"
    },
    scrollTrigger: {
      trigger: '.services__title',
      start: "top bottom",
      end: "+=50",
      pin:true,
      scrub: 1
    }
  })
  .from('.services__title', {
    x: -250
  });

  gsap.timeline({
    defaults: {
      ease: "none"
    },
    scrollTrigger: {
      trigger: '.price__title',
      start: "top bottom",
      end: "+=50",
      pin:true,
      scrub: 1
    }
  })
  .from('.price__title', {
    x: -250
  });

  gsap.timeline({
    defaults: {
      ease: "none"
    },
    scrollTrigger: {
      trigger: '.contacts__title',
      start: "top bottom",
      end: "+=50",
      pin:true,
      scrub: 1
    }
  })
  .from('.contacts__title', {
    x: -250
  });

  gsap.timeline({
    defaults: {
      ease: "none"
    },
    scrollTrigger: {
      trigger: '.portfolio__title',
      start: "top bottom",
      end: "+=50",
      pin:true,
      scrub: 1
    }
  })
  .from('.portfolio__title', {
    x: -250
  });


  ///////////////////////////////////

  let tl = gsap.timeline();
  let marquee = document.querySelector(".gallery");
  let content = document.querySelector(".gallery__content");
  let items = document.querySelectorAll(".gallery__item");
  let tlLength = items.length * 2;

  // animation timeline
  tl.to(".gallery__content", tlLength, {
    xPercent: -100,
    repeat: -1,
    ease: "none"
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
                ease: "power2.out"
              },
              onComplete: () => {
                currentScale = 1;
                scaleTl.kill();
              }
            })
            .to(tl, {
              duration: 0.2,
              timeScale: tScale,
                ease: "power2.out"
            })
            .to(
              tl,
              {
                timeScale: 1,
                duration: 1,
                ease: "none"
              },
              "+=1"
            );
        }
      }
    }
  });


  /////////////////////////////////
}
