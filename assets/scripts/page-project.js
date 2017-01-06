// TODO : Classic scroll on mobile device
// TODO : Title animation, etc....
// TODO : Differents animations on mobile device
// TODO : Add a fine end of project detection

module.exports = {
  init: () => {
    if (parseInt(getComputedStyle(document.querySelector('.singleProject')).width) >= 700) {
      console.log('page loaded');
      const routing = require('./router.js');
      const scroll = require('./scroll.js');
      const headerStyle = getComputedStyle(document.querySelector('.singleProject__header'));
      const headerSize = parseInt(headerStyle.length, 10) + parseInt(headerStyle.marginLeft, 10);
      let fired = false;
      let firstPage = true;

      function scrollBar(targetX, sectionWidth) {
        const scrollbar = document.getElementsByClassName('scrollbar');
        const scale = (-1 * targetX) / ((sectionWidth - window.innerWidth));
        scrollbar[0].style.transform = `translateZ(0) scaleX(${scale})`;
      }

      function animBackgrounds(targetX, sectionWidth){
        let percentImg = ((targetX*-1 - headerSize) / (sectionWidth - window.innerWidth)) * 100;
        if (percentImg >= 0 && percentImg < 90) {
          let photos = document.getElementsByClassName('singleProject__photo-wrap');
          let background = document.getElementsByClassName('singleProject__background-container');
          for (var i = (photos.length) - 1; i >= 0; i--) {
            if (targetX*-1 >= photos[i].offsetLeft - photos[i].offsetWidth) {
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
      }, 1000);

      const singleProject = document.querySelector('.singleProject');
    //   const currentSingle = singleProject.scrollLeft;
      // const background = document.getElementsByClassName('singleProject__background-container');
    //   const backgroundTransform = getComputedStyle(background[0]).transform;
      // const photos = document.querySelectorAll('.singleProject__photo');
    //   const projectsLength = document.getElementsByClassName('singleProject__photo-wrap').length;
      // const headerStyle = getComputedStyle(document.querySelector('.singleProject__header'));
      // const headerSize = parseInt(headerStyle.length, 10) + parseInt(headerStyle.marginLeft, 10);
      // console.log(headerSize);
    // //
      // if (parseInt(getComputedStyle(document.querySelector('.singleProject')).width) >= 700) {
      //   setTimeout(() => {
      //     for (const photo of photos) {
      //       photo.style.width = `${document.querySelector('.singleProject__photo:first-child').offsetWidth}px`;
      //     }
      //   }, 500);

        // resize();
        // scroll();
      // } else {
      //   document.querySelector('.singleProject__link').innerText = 'Click to see next project';
      // }

      // function resize() {
      //   if (parseInt(getComputedStyle(singleProject).width, 10) >= 700) {
      //     const mainContent = document.querySelector('.singleProject__main-content');
      //     const header = document.querySelector('.singleProject__header');
      //     mainContent.style.marginLeft = `${(parseInt(getComputedStyle(header).width, 10) - (parseInt(window.innerWidth, 10) / 1.3)) * -1}px`;
      //   }
      // }
    //
    // function scroll() {
    //   if (singleProject.addEventListener) {
    //     if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
    //       singleProject.addEventListener('scroll', scrollHorizontally, false);
    //     } else {
    //       singleProject.addEventListener('mousewheel', move, false);
    //       singleProject.addEventListener('scroll', stopScroll, false);
    //     }
    //   } else {
    //     document.querySelector('.singleProject').addEventListener('wheel', move);
    //   }
    //   if (parseInt(getComputedStyle(document.querySelector('.singleProject')).width) >= 700) {
    //     // console.log('desktop');
    //   }
    // }
    //
    // function move(e) {
    //   const delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    //   singleProject.scrollLeft -= delta * 30;
    //   scrollHorizontally(delta);
    //   e.preventDefault();
    // }
    //
    // function stopScroll(e) {
    //   e.preventDefault();
    // }
    //
    // function scrollHorizontally(delta) {
    //   if (singleProject.scrollLeft < document.querySelector('.singleProject__bigContainer').offsetWidth - window.innerWidth) {
    //     fadeBackground();
    //     animTitle();
    //     scrollBar();
    //   } else {
    //     end();
    //   }
    // }
    //

      function stopScrollLinks() {
        const links = Array.from(document.querySelectorAll('a'));
        links.forEach(link => link.addEventListener('click', () => {virtualScroll.off();}));
      }

      function animTitle(targetX) {
        console.log(targetX);
        if (targetX *-1 > 0) {
          console.log('indaloupe');
          if (!document.querySelector('.singleProject__header').classList.contains('singleProject__header--hidden')) {
            console.log('tarascon');
            document.querySelector('.singleProject__header').classList.add('singleProject__header--hidden');
            window.setTimeout(() => {
              document.querySelector('.singleProject__header').classList.add('singleProject__header--translated');
            }, 1000);
          }
        }
        if (targetX *-1 < 200) {
          if (document.querySelector('.singleProject__header').classList.contains('singleProject__header--hidden')) {
            document.querySelector('.singleProject__header').classList.remove('singleProject__header--translated');
            document.querySelector('.singleProject__header').classList.remove('singleProject__header--hidden');
          }
        }
      }

      function checkEnd(targetX, sectionWidth) {
        if ((-1 * targetX) > (sectionWidth - window.innerWidth) - 100) {
          end();
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

      stopScrollLinks();
    }
    else {
      document.querySelector('.singleProject__link').innerText = 'Click to see next project'
    }
  },
};
