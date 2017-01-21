// TODO : Differents animations on mobile device
// TODO : Add a fine end of project detection

module.exports = {
  init: () => {
    if (parseInt(getComputedStyle(document.querySelector('.singleProject')).width, 10) >= 700) {
      const routing = require('./router.js');
      const scroll = require('./scroll.js');
      const headerStyle = getComputedStyle(document.querySelector('.singleProject__header'));
      const headerSize = parseInt(headerStyle.length, 10) + parseInt(headerStyle.marginLeft, 10);
      let fired = false;
      let firstPage = true;
      let grayscale = 100;

      function scrollBar(targetX, sectionWidth) {
        const scrollbar = document.getElementsByClassName('scrollbar');
        const mainContent = document.querySelector('.singleProject__main-content');
        const scale = (-1 * targetX) / ((sectionWidth - window.innerWidth));
        scrollbar[0].style.transform = `translateZ(0) scaleX(${scale})`;
      }

      function animBackgrounds(targetX, sectionWidth){
        let percentImg = ((targetX*-1 - headerSize) / (sectionWidth - window.innerWidth)) * 100;
        if (percentImg >= 0 && percentImg < 80) {
          let photos = document.getElementsByClassName('singleProject__photo-wrap');
          let background = document.getElementsByClassName('singleProject__background-container');
          for (var i = (photos.length) - 1; i >= 0; i--) {
            if (targetX*-1 >= photos[i].offsetLeft) {
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

      let virtualScroll = scroll.init();
      // console.log(virtualScroll);
      const hasTouch = 'ontouchstart' in document;

      window.setTimeout(() => {
        scroll.run(virtualScroll, scrollBar, checkEnd, animBackgrounds, animTitle);
      }, 2000);

      const singleProject = document.querySelector('.singleProject');

      function stopScrollLinks() {
        const links = Array.from(document.querySelectorAll('a'));
        links.forEach(link => link.addEventListener('click', () => {virtualScroll.off();}));
      }

      function resize() {
        if (parseInt(getComputedStyle(singleProject).width, 10) >= 700) {
          const mainContent = document.querySelector('.singleProject__main-content');
          const header = document.querySelector('.singleProject__header');
          let toTransform = `${(parseInt(getComputedStyle(header).width, 10) - (parseInt(window.innerWidth, 10) / 1.3)) * -1}px`;
          mainContent.style.marginLeft = `${(parseInt(getComputedStyle(header).width, 10) - (parseInt(window.innerWidth, 10) / 1.3)) * -1}px`;
          // mainContent.style.transform = 'translateX('+(toTransform)+')';
          // singleProject.style.width = (parseInt(singleProject.offsetWidth) + parseInt(toTransform) ) + 'px';
        }
      }

      function animTitle(targetX) {
        if (targetX *-1 >= 200) {
          if (!document.querySelector('.singleProject__header').classList.contains('singleProject__header--hidden')) {
            document.querySelector('.singleProject__header').classList.add('singleProject__header--hidden');
            window.setTimeout(() => {
              document.querySelector('.singleProject__header').classList.add('singleProject__header--translated');
            }, 1000);
          }
        }
        if (targetX *-1 <= 200) {
          if (document.querySelector('.singleProject__header').classList.contains('singleProject__header--hidden')) {
            document.querySelector('.singleProject__header').classList.remove('singleProject__header--translated');
            document.querySelector('.singleProject__header').classList.remove('singleProject__header--hidden');
          }
        }
      }

      function checkEnd(targetX, sectionWidth) {
        if ((-1 * targetX) > (sectionWidth - window.innerWidth) - 300) {
          grayscale = Math.round(grayscale);
          console.log((targetX));
          grayscale = (-1 * ((-1 * targetX) - (sectionWidth - window.innerWidth)) / 3);
          document.querySelector('.singleProject__bg-photo--teaser').style.filter = 'grayscale(' + grayscale + '%)';
          if(grayscale <= 0){
            end();
          }
        } else if (document.querySelector('.singleProject').classList.contains('end-project')) {
          document.querySelector('.singleProject').classList.remove('end-project');
        }
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
                virtualScroll.off();
                // resize();
                fired = false;
              }, 1000);
            }
          } else if ((fired === false)) {
            document.querySelector('.container').classList.add('project--scrolling');
          }
        } else {
          window.setTimeout(() => {
            document.querySelector('.singleProject').classList.add('end-project');
          }, 30);
        }
      }
      resize();
      stopScrollLinks();
    }
    else {
      document.querySelector('.singleProject__link').innerText = 'Click to see next project';
    }
  },
};
