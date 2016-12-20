module.exports = {
  init: () => {
  //   const routing = require('./router.es6');
  //   let fired = false;
  //   const singleProject = document.querySelector('.singleProject');
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
  //   function animTitle() {
  //     if (singleProject.scrollLeft > 0) {
  //       if (!document.querySelector('.singleProject__header').classList.contains('singleProject__header--hidden')) {
  //         document.querySelector('.singleProject__header').classList.add('singleProject__header--hidden');
  //         window.setTimeout(() => {
  //           document.querySelector('.singleProject__header').classList.add('singleProject__header--translated');
  //         }, 1000);
  //       }
  //     }
  //     if (singleProject.scrollLeft < 200) {
  //       console.log(singleProject.scrollLeft);
  //       if (document.querySelector('.singleProject__header').classList.contains('singleProject__header--hidden')) {
  //         document.querySelector('.singleProject__header').classList.remove('singleProject__header--translated');
  //         document.querySelector('.singleProject__header').classList.remove('singleProject__header--hidden');
  //       }
  //     }
  //   }
  //
  //   function scrollBar() {
  //     const scrollbar = document.getElementsByClassName('scrollbar');
  //     window.setTimeout(() => {
  //       const scale = (singleProject.scrollLeft / (container.offsetWidth - headerSize - window.innerWidth));
  //       scrollbar[0].style.transform = `translateZ(0) scaleX(${scale})`;
  //     }, 10);
  //   }
  //
  //   function end() {
  //     if (document.querySelector('.singleProject').classList.contains('end-project')) {
  //       if (document.querySelector('.container').classList.contains('project--scrolling')) {
  //         if (fired === false) {
  //           fired = true;
  //           window.setTimeout(() => {
  //             document.querySelector('.container').classList.toggle('container--visible');
  //             routing.router.navigate(document.querySelector('.singleProject__link').getAttribute('href'));
  //             document.querySelector('.container').classList.toggle('project--scrolling');
  //             resize();
  //             fired = false;
  //           }, 1000);
  //         }
  //       } else if ((fired === false)) {
  //         document.querySelector('.container').classList.add('project--scrolling');
  //       }
  //     } else {
  //       window.setTimeout(() => {
  //         document.querySelector('.singleProject').classList.add('end-project');
  //       }, 1000);
  //     }
  //   }


    var VirtualScroll = (function(document){

    var vs = {};

    var numListeners, listeners = [], initialized = false;

    var touchStartX, touchStartY;

    // [ These settings can be customized with the options() function below ]
    // Mutiply the touch action by two making the scroll a bit faster than finger movement
    var touchMult = 2;
    // Firefox on Windows needs a boost, since scrolling is very slow
    var firefoxMult = 15;
    // How many pixels to move with each key press
    var keyStep = 120;
    // General multiplier for all mousehweel including FF
    var mouseMult = 1;

    var bodyTouchAction;

    var hasWheelEvent = 'onwheel' in document;
    var hasMouseWheelEvent = 'onmousewheel' in document;
    var hasTouch = 'ontouchstart' in document;
    var hasTouchWin = navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1;
    var hasPointer = !!window.navigator.msPointerEnabled;
    var hasKeyDown = 'onkeydown' in document;

    var isFirefox = navigator.userAgent.indexOf('Firefox') > -1;

    var event = {
      y: 0,
      x: 0,
      deltaX: 0,
      deltaY: 0,
      originalEvent: null
    };

    vs.on = function(f) {
      if(!initialized) initListeners();
      listeners.push(f);
      numListeners = listeners.length;
    }

    vs.options = function(opt) {
      keyStep = opt.keyStep || 120;
      firefoxMult = opt.firefoxMult || 15;
      touchMult = opt.touchMult || 2;
      mouseMult = opt.mouseMult || 1;
    }

    vs.off = function(f) {
      listeners.splice(f, 1);
      numListeners = listeners.length;
      if(numListeners <= 0) destroyListeners();
    }

    var notify = function(e) {
      event.x += event.deltaX;
      event.y += event.deltaY;
      event.originalEvent = e;

      for(var i = 0; i < numListeners; i++) {
        listeners[i](event);
      }
    }

    var onWheel = function(e) {
      // In Chrome and in Firefox (at least the new one)
      event.deltaX = e.wheelDeltaX || e.deltaX * -1;
      event.deltaY = e.wheelDeltaY || e.deltaY * -1;

      // for our purpose deltamode = 1 means user is on a wheel mouse, not touch pad
      // real meaning: https://developer.mozilla.org/en-US/docs/Web/API/WheelEvent#Delta_modes
      if(isFirefox && e.deltaMode == 1) {
        event.deltaX *= firefoxMult;
        event.deltaY *= firefoxMult;
      }

      event.deltaX *= mouseMult;
      event.deltaY *= mouseMult;

      notify(e);
    }

    var onMouseWheel = function(e) {
      // In Safari, IE and in Chrome if 'wheel' isn't defined
      event.deltaX = (e.wheelDeltaX) ? e.wheelDeltaX : 0;
      event.deltaY = (e.wheelDeltaY) ? e.wheelDeltaY : e.wheelDelta;

      notify(e);
    }

    var onTouchStart = function(e) {
      var t = (e.targetTouches) ? e.targetTouches[0] : e;
      touchStartX = t.pageX;
      touchStartY = t.pageY;
    }

    var onTouchMove = function(e) {
      // e.preventDefault(); // < This needs to be managed externally
      var t = (e.targetTouches) ? e.targetTouches[0] : e;

      event.deltaX = (t.pageX - touchStartX) * touchMult;
      event.deltaY = (t.pageY - touchStartY) * touchMult;

      touchStartX = t.pageX;
      touchStartY = t.pageY;

      notify(e);
    }

    var onKeyDown = function(e) {
      // 37 left arrow, 38 up arrow, 39 right arrow, 40 down arrow
      event.deltaX = event.deltaY = 0;
      switch(e.keyCode) {
        case 37:
          event.deltaX = -keyStep;
          break;
        case 39:
          event.deltaX = keyStep;
          break;
        case 38:
          event.deltaY = keyStep;
          break;
        case 40:
          event.deltaY = -keyStep;
          break;
      }

      notify(e);
    }

    var initListeners = function() {
      if(hasWheelEvent) document.addEventListener("wheel", onWheel);
      if(hasMouseWheelEvent) document.addEventListener("mousewheel", onMouseWheel);

      if(hasTouch) {
        document.addEventListener("touchstart", onTouchStart);
        document.addEventListener("touchmove", onTouchMove);
      }

      if(hasPointer && hasTouchWin) {
        bodyTouchAction = document.body.style.msTouchAction;
        document.body.style.msTouchAction = "none";
        document.addEventListener("MSPointerDown", onTouchStart, true);
        document.addEventListener("MSPointerMove", onTouchMove, true);
      }

      if(hasKeyDown) document.addEventListener("keydown", onKeyDown);

      initialized = true;
    }

    var destroyListeners = function() {
      if(hasWheelEvent) document.removeEventListener("wheel", onWheel);
      if(hasMouseWheelEvent) document.removeEventListener("mousewheel", onMouseWheel);

      if(hasTouch) {
        document.removeEventListener("touchstart", onTouchStart);
        document.removeEventListener("touchmove", onTouchMove);
      }

      if(hasPointer && hasTouchWin) {
        document.body.style.msTouchAction = bodyTouchAction;
        document.removeEventListener("MSPointerDown", onTouchStart, true);
        document.removeEventListener("MSPointerMove", onTouchMove, true);
      }

      if(hasKeyDown) document.removeEventListener("keydown", onKeyDown);

      initialized = false;
    }

    return vs;
  })(document);

  const section = document.querySelector('.singleProject');
  let sectionWidth = section.getBoundingClientRect().width;

  document.addEventListener('touchmove', function(e) {
    e.preventDefault();
  });

  let targetX = 0;

  VirtualScroll.on(function(e) {
    targetX += e.deltaY;
    targetX = Math.max( (sectionWidth - window.innerWidth) * -1, targetX);
    targetX = Math.min(0, targetX);
    console.log(sectionWidth - window.innerWidth);
    console.log(targetX);
  });

  let currentX = 0,
      ease = 0.1;

  let run = function(){
    requestAnimationFrame(run);
    currentX += (targetX - currentX) * ease;
    var t = 'translateX(' + currentX + 'px) translateZ(0)';
    var s = section.style;
    s["transform"] = t;
    s["webkitTransform"] = t;
    s["mozTransform"] = t;
    s["msTransform"] = t;
  };

  run();

  },
};
