module.exports = {

  init: () => {
    // Index of slides
    let prevProject = null;
    let currentProject = 0;
    // Get Elements to animate
    const slides = document.querySelectorAll('.project__imageBackground');
    const frontSlides = document.querySelectorAll('.project__imageFront');
    const titlesSlides = document.querySelectorAll('.project__title');
    const descriptionSlides = document.querySelectorAll('.project__description');
    const chapters = document.querySelectorAll('.carousel__option');
    const projectLinks = document.querySelectorAll('.project__link');

    let touchStartY = null;
    let deltaY = null;

    // Timelines for tweenmax
    const tl1 = new TimelineMax();
    const tl2 = new TimelineMax();
    // Prevents glitch with scroll
    let isScrolling = false;

  /**
   * Chapters selection with numbers on the right
   * @param {int} toRemove, index of the chapter number to remove.
   * @param {int} toAdd, index of the chapter number to add
   * @returns {void}
   */
    function switchChapters(toRemove, toAdd) {
      console.log('switching');
      chapters[toRemove].classList.remove('carousel__option--on');
      chapters[toAdd].classList.add('carousel__option--on');
    }

    /**
    * Moves the slides
    * @param {number} project the project of the number we want to display.
    * @returns {void}
    */
    function selectSlide(project) {
      let selectedProject = project;
      // check if we have to loop
      if (selectedProject >= slides.length) {
        selectedProject = 0;
      } else if (selectedProject < 0) {
        selectedProject = parseInt((slides.length) - 1, 10);
      }
      prevProject = currentProject;
      slides[selectedProject].style.display = 'block';
      frontSlides[selectedProject].style.display = 'block';
      titlesSlides[selectedProject].style.display = 'block';
      descriptionSlides[selectedProject].style.display = 'block';
      projectLinks[selectedProject].style.display = 'block';

      setTimeout(() => {
        isScrolling = true;
        tl1.to(slides[selectedProject], 0.3,
          {
            y: '-100%',
          });
        tl1.to(frontSlides[selectedProject], 0.4,
          {
            y: '-100%',
          });
        tl1.to(titlesSlides[prevProject], 0.2,
          {
            y: '100%',
          }, '0');
        tl1.to(descriptionSlides[prevProject], 0.2,
          {
            y: '100%',
          }, '-= 0.4');
        tl1.to(projectLinks[prevProject], 0.2,
          {
            y: '100%',
          }, '-= 0.4');
        setTimeout(() => {
          tl2.to(slides[prevProject], 0.3,
            {
              y: '-=100%',
              zIndex: '0',
            });
          tl2.to(frontSlides[prevProject], 0.2,
            {
              y: '-=100%',
              zIndex: '0',
            }, '+=0.2');
          tl2.to(titlesSlides[selectedProject], 0.4,
            {
              y: '-=100%',
              zIndex: '0',
            }, '-=0.4');
          tl2.to(descriptionSlides[selectedProject], 0.6,
            {
              y: '-=100%',
              zIndex: '0',
            }, '-=0.6');
          tl2.to(projectLinks[selectedProject], 0.8,
            {
              y: '-=100%',
              zIndex: '0',
            }, '-=0.8');
          setTimeout(() => {
            tl2.to(slides[prevProject], 0,
              {
                display: 'none',
                top: '100%',
                transform: 'translateY(0)',
                zIndex: 1,
              });
            tl2.to(frontSlides[prevProject], 0,
              {
                display: 'none',
                top: '100%',
                transform: 'translateY(0)',
                zIndex: 1,
              });
            tl2.to(titlesSlides[prevProject], 0,
              {
                display: 'none',
                top: '100%',
                transform: 'translateY(0)',
                zIndex: 1,
              });
            tl2.to(descriptionSlides[prevProject], 0,
              {
                display: 'none',
                top: '100%',
                transform: 'translateY(0)',
                zIndex: 1,
              });
            tl2.to(projectLinks[prevProject], 0,
              {
                display: 'none',
                top: '100%',
                transform: 'translateY(0)',
                zIndex: 1,
              });
            isScrolling = false;
          }, 1400);
          switchChapters(currentProject, selectedProject);
          currentProject = selectedProject;
        }, 20);
      }, 20);
    }

    /**
    * Get slides and init theirs styles
    * @returns {void}
    */
    function initSlides() {
      /**
      * Init magnetic scroll
      * @param {number} wheelDelta the delta returned by the mousewheel event
      * @returns {void}
      */
      function magnet(wheelDelta) {
        if (wheelDelta > 0) {
          selectSlide((currentProject - 1));
        }
        if (wheelDelta < 0) {
          selectSlide((currentProject + 1));
        }
      }
      const throttled = _.throttle(magnet, 2000, {
        leading: true,
        trailing: false,
      });
      projectLinks[0].style.top = '0';
      for (let slide of slides.keys()) {
        if (slide !== 0) {
          slides[slide].style.display = 'none';
          frontSlides[slide].style.display = 'none';
          titlesSlides[slide].style.display = 'none';
          projectLinks[slide].style.display = 'none';
          descriptionSlides[slide].style.display = 'none';
        }
      }

      /**
      * Get slides and init theirs styles
      * @param {object} e the event object
      * @returns {void}
      */
      function updatePosition(e) {
        e.preventDefault();
        throttled(e.wheelDelta || -e.detail);
      }
      // document.addEventListener('mousewheel', updatePosition);

      if (document.querySelector('.home').addEventListener) {
        document.querySelector('.home').addEventListener('DOMMouseScroll', updatePosition, false);
        document.querySelector('.home').addEventListener('mousewheel', updatePosition, false);
      } else {
        document.querySelector('.home').addEventListener('wheel', updatePosition);
      }
    }

    /**
    * Get slides and init theirs styles
    * @returns {void}
    */
    function chapterAddEventListener() {
      const selectedChapter = parseInt(this.getAttribute('data-chapter') - 1, 10);
      if (selectedChapter !== currentProject && isScrolling === false) {
        selectSlide(selectedChapter);
        switchChapters(currentProject, selectedChapter);
      }
    }

    /**
    * Get slides and init theirs styles
    * @returns {void}
    */
    function chaptersScroll() {
      for (let chapter of chapters) {
        chapter.addEventListener('click', chapterAddEventListener);
      }
    }

    /**
    * Get slides and init theirs styles
    * @returns {void}
    */
    function firstApparition() {
      tl2.to(slides[0], 0.3,
        {
          y: '-=100%',
          zIndex: '0',
        });
      tl2.to(frontSlides[0], 0.2,
        {
          y: '-=100%',
          zIndex: '0',
        }, '-=0.8');
      tl2.to(titlesSlides[0], 0.4,
        {
          y: '-=100%',
          zIndex: '0',
        }, '-=0.4');
      tl2.to(descriptionSlides[0], 0.6,
        {
          y: '-=100%',
          zIndex: '0',
        }, '-=0.6');
    }

    function detectTouch() {
      const hasTouch = 'ontouchstart' in document;

      if(hasTouch) {
        console.log('touchscreen');
        document.querySelector('.home').addEventListener('touchstart', onTouchStart);
        document.querySelector('.home').addEventListener('touchmove', onTouchMove);
        document.querySelector('.home').addEventListener('touchend', onTouchEnd);
      }
    }

    function onTouchStart(e) {
      const t = (e.targetTouches) ? e.targetTouches[0] : e;
      touchStartY = t.pageY;
    }

    function onTouchMove(e) {
      e.preventDefault(); // < This needs to be managed externally
      const t = (e.targetTouches) ? e.targetTouches[0] : e;
      deltaY = (t.pageY - touchStartY);
      // touchStartY = deltaY;
    }

    function onTouchEnd(e) {
      console.log(deltaY)
      if (isScrolling === false) {
        if (deltaY < 0) {
          selectSlide(currentProject - 1);
        }

        if (deltaY > 0) {
          selectSlide(currentProject + 1);
        }
      }
      deltaY = 0;
    }

    /**
    * Init scrolling for home page.
    * @returns {void}
    */
    function init() {
      initSlides();
      chaptersScroll();
      firstApparition();
      detectTouch();
    }
    init();
  },
};
