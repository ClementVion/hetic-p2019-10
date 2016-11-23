module.exports = {
    init: function() {
        let routing = require('./router.es6');
        class Init {
            constructor() {
              setTimeout(function() {
                for (let i = 0; i < document.querySelectorAll('.singleProject__photo').length; i++) {
                    document.querySelectorAll('.singleProject__photo')[i].style.width = document.querySelector('.singleProject__photo:first-child').offsetWidth + 'px';
                }
              }, 500);
              let resize = new Resize();
            }
        }

        class Resize {
            constructor() {
                if (parseInt(getComputedStyle(document.querySelector('.singleProject')).width) >= 700) {
                    let mainContent = document.querySelector('.singleProject__main-content'),
                        header = document.querySelector('.singleProject__header');
                    mainContent.style.marginLeft = (parseInt(getComputedStyle(header).width) - parseInt(window.innerWidth) / 1.3) * -1 + "px";
                }
            }
        }

        class Scroll {
            constructor() {
                let fired = false;
                if (parseInt(getComputedStyle(document.querySelector('.singleProject')).width) >= 700) {
                    if (document.querySelector('.singleProject').addEventListener) {
                        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
                            document.querySelector('.singleProject').addEventListener("scroll", scrollHorizontally, false);
                        }
                        else {
                            document.querySelector('.singleProject').addEventListener("mousewheel", move, false);
                        }
                    } else {
                        document.querySelector('.singleProject').addEventListener("wheel",move);
                    }
                }

                function move(e){
                  let singleProject = document.querySelector('.singleProject'),
                      delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
                  singleProject.scrollLeft -= delta * 30;
                  scrollHorizontally(delta);
                  e.preventDefault();
                }

                function stopScroll(e){
                  e.preventDefault();
                }
                function scrollHorizontally(delta) {
                    let singleProject = document.querySelector('.singleProject'),
                        currentSingle = singleProject.scrollLeft,
                        background = document.getElementsByClassName('singleProject__background-container'),
                        backgroundTransform = getComputedStyle(background[0]).transform,
                        container = document.querySelector('.singleProject__bigContainer'),
                        slice = (container.offsetWidth) / projectsLength,
                        projectsLength = document.getElementsByClassName('singleProject__photo-wrap').length,
                        headerStyle = getComputedStyle(document.querySelector('.singleProject__header')),
                        headerSize = parseInt(headerStyle.length) + parseInt(headerStyle.marginLeft);

                    if (singleProject.scrollLeft < document.querySelector('.singleProject__bigContainer').offsetWidth - window.innerWidth) {
                        fadeBackground();
                        animTitle();
                        scrollBar();

                    } else {
                      console.log("end");
                      end();
                    }

                    function fadeBackground() {
                        let percentImg = (currentSingle - headerSize) / (container.offsetWidth - window.innerWidth - headerSize - 570) * 100;
                        if (percentImg >= 0 && percentImg < 90) {
                            let photos = document.getElementsByClassName('singleProject__photo-wrap');
                            let background = document.getElementsByClassName('singleProject__background-container');
                            for (var i = (photos.length) - 1; i > 0; i--) {
                                if (singleProject.scrollLeft >= photos[i].offsetLeft) {
                                    if (background[i].classList.contains('singleProject__background-container--visible') == false) {
                                        if (document.querySelector('.singleProject__background-container--visible')) {
                                            document.querySelector('.singleProject__background-container--visible').classList.remove('singleProject__background-container--visible');
                                        }
                                        background[i].classList.add('singleProject__background-container--visible');
                                    }
                                    return;
                                }
                            }
                        } else {
                            if ((document.querySelector('.singleProject__background-container--visible'))) {
                                document.querySelector('.singleProject__background-container--visible').classList.remove('singleProject__background-container--visible');
                            }
                        }
                    }
                    function animTitle(){
                      if (currentSingle > 500 && delta > 0) {
                          document.querySelector('.singleProject__header').classList.add('singleProject__header--hidden');
                          window.setTimeout(function() {
                              document.querySelector('.singleProject__header').classList.add('singleProject__header--translated');
                          }, 1000);
                      }
                      if (currentSingle == 0 && currentSingle > -400) {
                          document.querySelector('.singleProject__header').classList.remove('singleProject__header--translated');
                          document.querySelector('.singleProject__header').classList.remove('singleProject__header--hidden');
                      }
                    }

                  function scrollBar() {
                    const scrollbar = document.getElementsByClassName('scrollbar');
                    window.setTimeout(() => {
                      const scale = (currentSingle / (container.offsetWidth - headerSize));
                      scrollbar[0].style.transform = `translateZ(0) scaleX(${scale})`;
                    }, 10);
                  }
                }

                function end() {
                  if (document.querySelector('.singleProject').classList.contains('end-project')) {
                      if (document.querySelector('.container').classList.contains('project--scrolling')) {
                          if (fired === false) {
                              fired = true;
                              window.setTimeout(function() {
                                  document.querySelector('.container').classList.toggle('container--visible');
                                  routing.router.navigate(document.querySelector('.singleProject__link').getAttribute('href'));
                                  document.querySelector('.container').classList.toggle('project--scrolling');
                                  let replace = new Resize();
                                  fired = false;
                              }, 1000);
                          }
                      } else {
                          if (fired === false) {
                              document.querySelector('.container').classList.add('project--scrolling');
                          }
                      }
                  } else {
                      document.querySelector('.singleProject').classList.add('end-project');
                  }
                }
            }
        }
    let start = new Init();
    let scroll = new Scroll();
  }
}
