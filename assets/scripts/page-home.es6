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
    // Timelines for tweenmax
    const tl1 = new TimelineMax();
    const tl2 = new TimelineMax();
    // Prevents glitch with scroll
    let isScrolling = false;
    
    function selectSlide(selectedProject) {
      // check if we have to loop
      if (selectedProject >= slides.length) {
        selectedProject = 0;
      } else if (selectedProject < 0) {
        selectedProject = (parseInt((slides.length) - 1));
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
        tl1.to(frontSlides[selectedProject], 0.2,
          {
            y: '-100%',
          });
        tl1.to(titlesSlides[prevProject], 0.4,
          {
            y: '100%',
          }, '-= 0.4');
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
            });
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
      // Get slides and init theirs styles
    function initSlides() {
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
      for (let j = 1; j < frontSlides.length; j++) {
        frontSlides[j].style.display = 'none';
      }
      for (let i = 1; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }
      for (let k = 1; k < titlesSlides.length; k++) {
        titlesSlides[k].style.display = 'none';
      }
      for (let l = 1; l < descriptionSlides.length; l++) {
        descriptionSlides[l].style.display = 'none';
      }
      for (let m = 1; m < descriptionSlides.length; m++) {
        projectLinks[m].style.display = 'none';
      }

      function updatePosition(e) {
        e.preventDefault();
        throttled(e.wheelDelta);
      } 
      document.addEventListener('mousewheel', updatePosition);
    }

    // Chapters selection with numbers on the right
    function switchChapters(toRemove, toAdd) {
      chapters[toRemove].classList.remove('carousel__option--on');
      chapters[toAdd].classList.add('carousel__option--on');
    }

    function automaticScroll() {
      setInterval(() => {
        selectSlide(currentProject);
      }, 3650);
    }

    function chaptersScroll() {
        for (const chapter of chapters) {
          chapter.addEventListener('click', chapterAddEventListener);
        }
    }

    function chapterAddEventListener() {
      const selectedChapter = parseInt(this.getAttribute('data-chapter') - 1, 10);
      if (selectedChapter !== currentProject && isScrolling === false) {
        selectSlide(selectedChapter);
        switchChapters(currentProject, selectedChapter);
      }
    }

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

      // Init scrolling for home page
    function init() {
      initSlides();
      chaptersScroll();
      firstApparition();
    }
    init();
  },
};
