module.exports = {
  init: () => {
    let routing = require('./router.es6');
    let fired = false;
    const singleProject = document.querySelector('.singleProject');
    const currentSingle = singleProject.scrollLeft;
    const background = document.getElementsByClassName('singleProject__background-container');
    const container = document.querySelector('.singleProject__bigContainer');
    const backgroundTransform = getComputedStyle(background[0]).transform;
    const slice = ((container.offsetWidth) / projectsLength);
    const photos = document.querySelectorAll('.singleProject__photo');
    const projectsLength = document.getElementsByClassName('singleProject__photo-wrap').length;
    const headerStyle = getComputedStyle(document.querySelector('.singleProject__header'));
    const headerSize = parseInt(headerStyle.length, 10) + parseInt(headerStyle.marginLeft, 10);
    
    if (parseInt(getComputedStyle(document.querySelector('.singleProject')).width) >= 700) {
      setTimeout(() => {
          for (const photo of photos) {
            photo.style.width = `${document.querySelector('.singleProject__photo:first-child').offsetWidth}px`;
          }
      }, 500);  

      resize();
      scroll();
    } else {
      document.querySelector('.singleProject__link').innerText = 'Click to see next project'
    }

    function resize() {
      if (parseInt(getComputedStyle(singleProject).width, 10) >= 700) {
        const mainContent = document.querySelector('.singleProject__main-content');
        const header = document.querySelector('.singleProject__header');
        mainContent.style.marginLeft = `${(parseInt(getComputedStyle(header).width, 10) - (parseInt(window.innerWidth, 10) / 1.3)) * -1}px`;
      }
    }

  function scroll() {
    if (singleProject.addEventListener) {
      if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        singleProject.addEventListener('scroll', scrollHorizontally, false);
      } else {
        singleProject.addEventListener('mousewheel', move, false);
        singleProject.addEventListener('scroll', stopScroll, false);
      }
    } else {
      document.querySelector('.singleProject').addEventListener('wheel', move);
    }
    if (parseInt(getComputedStyle(document.querySelector('.singleProject')).width) >= 700) {
      // console.log('desktop');
    }
  }

  function move(e) {
    const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    singleProject.scrollLeft -= delta * 30;
    scrollHorizontally(delta);
    e.preventDefault();
  }

  function stopScroll(e) {
    e.preventDefault();
  }

  function scrollHorizontally(delta) {
    if (singleProject.scrollLeft < document.querySelector('.singleProject__bigContainer').offsetWidth - window.innerWidth) {
      fadeBackground();
      animTitle();
      scrollBar();
    } else {
      end();
    }
  }

    function fadeBackground() {
      let percentImg = ((singleProject.scrollLeft - headerSize) / (container.offsetWidth - window.innerWidth)) * 100;
      if (percentImg >= 0 && percentImg < 90) {
        let photos = document.getElementsByClassName('singleProject__photo-wrap');
        let background = document.getElementsByClassName('singleProject__background-container');
        for (var i = (photos.length) - 1; i >= 0; i--) {
          if (singleProject.scrollLeft >= photos[i].offsetLeft - photos[i].offsetWidth) {
            console.log(i);
            if (background[i].classList.contains('singleProject__background-container--visible') === false) {
              if (document.querySelector('.singleProject__background-container--visible')) {
                document.querySelector('.singleProject__background-container--visible').classList.remove('singleProject__background-container--visible');
              }
              background[i].classList.add('singleProject__background-container--visible');
            }
            return;
          }
        }
      } else if (document.querySelector('.singleProject__background-container--visible')) {
        document.querySelector('.singleProject__background-container--visible').classList.remove('singleProject__background-container--visible');
      }
    }

    function animTitle() {
      if (singleProject.scrollLeft > 0) {
        if (!document.querySelector('.singleProject__header').classList.contains('singleProject__header--hidden')) {
          document.querySelector('.singleProject__header').classList.add('singleProject__header--hidden');
          window.setTimeout(() => {
            document.querySelector('.singleProject__header').classList.add('singleProject__header--translated');
          }, 1000);
        }
      }
      if (singleProject.scrollLeft < 200) {
        console.log(singleProject.scrollLeft);
        if (document.querySelector('.singleProject__header').classList.contains('singleProject__header--hidden')) {
          document.querySelector('.singleProject__header').classList.remove('singleProject__header--translated');
          document.querySelector('.singleProject__header').classList.remove('singleProject__header--hidden');
        }
      }
    }

    function scrollBar() {
      const scrollbar = document.getElementsByClassName('scrollbar');
      window.setTimeout(() => {
        const scale = (singleProject.scrollLeft / (container.offsetWidth - headerSize - window.innerWidth));
        scrollbar[0].style.transform = `translateZ(0) scaleX(${scale})`;
      }, 10);
    }

    function end() {
      if (document.querySelector('.singleProject').classList.contains('end-project')) {
        if (document.querySelector('.container').classList.contains('project--scrolling')) {
          if (fired === false) {
            fired = true;
            window.setTimeout(() => {
              document.querySelector('.container').classList.toggle('container--visible');
              routing.router.navigate(document.querySelector('.singleProject__link').getAttribute('href'));
              document.querySelector('.container').classList.toggle('project--scrolling');
              resize();
              fired = false;
            }, 1000);
          }
        } else if ((fired === false)) {
          document.querySelector('.container').classList.add('project--scrolling');
        }
      } else {
        window.setTimeout(() => {
          document.querySelector('.singleProject').classList.add('end-project');
        }, 1000);
      }
    }
  },
};