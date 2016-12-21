module.exports = {
  init: () => {
    console.log('page loaded');
    const routing = require('./router.es6');
    const scroll = require('./scroll.es6');
    let fired = false;
    let firstPage = true;

    function scrollBar(targetX, sectionWidth) {
      const scrollbar = document.getElementsByClassName('scrollbar');
      const scale = (-1 * targetX) / ((sectionWidth - window.innerWidth));
      scrollbar[0].style.transform = `translateZ(0) scaleX(${scale})`;
    }
    let virtualScroll = scroll.init();
    console.log(virtualScroll);
    window.setTimeout(() => {
      scroll.run(virtualScroll, scrollBar, checkEnd);
    }, 1000);

    const singleProject = document.querySelector('.singleProject');
  //   const currentSingle = singleProject.scrollLeft;
  //   const background = document.getElementsByClassName('singleProject__background-container');
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

  //
    function animTitle() {
      if (targetX > 0) {
        if (!document.querySelector('.singleProject__header').classList.contains('singleProject__header--hidden')) {
          document.querySelector('.singleProject__header').classList.add('singleProject__header--hidden');
          window.setTimeout(() => {
            document.querySelector('.singleProject__header').classList.add('singleProject__header--translated');
          }, 1000);
        }
      }
      if (targetX < 200) {
        if (document.querySelector('.singleProject__header').classList.contains('singleProject__header--hidden')) {
          document.querySelector('.singleProject__header').classList.remove('singleProject__header--translated');
          document.querySelector('.singleProject__header').classList.remove('singleProject__header--hidden');
        }
      }
    }
  //


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
  },
};
