module.exports = {
    init: function() {
        console.log('zizi');
        let routing = require('./router.es6');
        class Init {
            constructor() {
              document.querySelector('.singleProject').onresize = function(event) {
                let resize = new Resize();
              };
            }
        }

        class Resize {
          constructor() {
            let mainContent = document.querySelector('.singleProject__main-content'),
                header = document.querySelector('.singleProject__header');
            mainContent.style.marginLeft = (parseInt(getComputedStyle(header).width) - parseInt(window.innerWidth)/1.3)*-1 + "px";
          }
        }

        class Scroll {
            constructor() {
                let throttled = _.throttle(scrollHorizontaly, 20, {
                    leading: true,
                    trailing: false
                });

                let fired = false;
                // window.addEventListener('wheel', fireScrollBar);
<<<<<<< HEAD
                window.addEventListener('mousewheel', fireScroll);
=======
                document.querySelector('.singleProject').addEventListener('wheel', fireScroll);
>>>>>>> 9952067c2e89fbdefd212c407b6d853f75c9353f

                function scrollHorizontaly(e) {
                    if (parseInt(getComputedStyle(document.querySelector('.singleProject')).width) >= 700) {
                        let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))),
                            singleProject = document.querySelector('.singleProject'),
                            currentSingle = getComputedStyle(singleProject).transform,
                            background = document.getElementsByClassName('singleProject__background-container'),
                            backgroundTransform = getComputedStyle(background[0]).transform,
                            scrollbar = document.getElementsByClassName('scrollbar');
                        currentSingle = parseInt(currentSingle.split(" ")[4]);
                        backgroundTransform = parseInt(backgroundTransform.split(" ")[4]);

                        let projectsLength = document.getElementsByClassName('singleProject__photo-wrap').length,
                            headerStyle = getComputedStyle(document.querySelector('.singleProject__header'));

                        let headerSize = parseInt(headerStyle.length) + parseInt(headerStyle.marginLeft);

                        let percentImg = (currentSingle * -1 - headerSize) / (parseInt(getComputedStyle(singleProject).width) - window.innerWidth - headerSize - 570) * 100;
                        let slice = 99 / projectsLength;
                        let currentSlice = Math.round(percentImg / slice);
                        if (percentImg >= 0 && percentImg < 90) {
                            for (var i = projectsLength; i > currentSlice; i--) {
                                if (document.querySelector('.singleProject__background-container--visible')) {
                                    document.querySelector('.singleProject__background-container--visible').classList.remove('singleProject__background-container--visible');
                                }
                                background[currentSlice].classList.add('singleProject__background-container--visible');
                            }
                        } else {
                            if ((document.querySelector('.singleProject__background-container--visible'))) {
                                document.querySelector('.singleProject__background-container--visible').classList.remove('singleProject__background-container--visible');
                            }
                        }

                        if ((currentSingle + (delta * 5) <= 0 && (((currentSingle + (delta * 15))) * -1) <= (parseInt(getComputedStyle(singleProject).width) - window.innerWidth))) {
                            singleProject.style.transform = "matrix(1, 0, 0, 1, " + (currentSingle + delta * 25) + ", 0)";
                            singleProject.style.webKittransform = "matrix(1, 0, 0, 1, " + (currentSingle + delta * 25) + ", 0)";
                            singleProject.style.mozTransform = "matrix(1, 0, 0, 1, " + (currentSingle + delta * 25) + ", 0)";
                            singleProject.style.msTransform = "matrix(1, 0, 0, 1, " + (currentSingle + delta * 25) + ", 0)";

                            let scale = currentSingle / (parseInt(getComputedStyle(singleProject).width) - window.innerWidth );
                            if (currentSingle < - 40) {
                              scrollbar[0].style.transform = "translateZ(0) scaleX("+(scale*-1) +")";
                              scrollbar[0].style.webKittransform = "translateZ(0) scaleX("+(scale*-1) +")";
                              scrollbar[0].style.mozTransform = "translateZ(0) scaleX("+(scale*-1) +")";
                              scrollbar[0].style.msTransform = "translateZ(0) scaleX("+(scale*-1) +")";
                            }

                        } else {
                            if (delta < 0) {
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
                        if (currentSingle > (-500) && delta < 0) {
                            document.querySelector('.singleProject__header').classList.add('singleProject__header--hidden');
                              window.setTimeout(function() {
                                document.querySelector('.singleProject__header').classList.add('singleProject__header--translated');
                            }, 1000);
                            window.setTimeout
                        }
                        if (currentSingle == 0 && currentSingle > -400 && delta >= 0) {
                          document.querySelector('.singleProject__header').classList.remove('singleProject__header--translated');
                            document.querySelector('.singleProject__header').classList.remove('singleProject__header--hidden');
                        }

                        e.preventDefault();
                    }
                }

                // function scrollBar() {
                //       let container = document.querySelector(".singleProject"),
                //           scrollbar = document.getElementsByClassName('scrollbar'),
                //           currentScroll = getComputedStyle(container).transform;
                //
                //       currentScroll = parseInt(currentScroll.split(" ")[4]);
                //     if (currentScroll < -10) {
                //       window.setTimeout(function() {
                //         // let scale = (Math.ceil((currentScroll) * -1 / (parseInt(getComputedStyle(container).width) - window.innerWidth)*100))/100;
                //         // scrollbar[0].style.transform = "translateZ(0) scaleX("+scale+")";
                //       }, 10);
                //     }
                // }

                function fireScroll(e) {
                    console.log('this');
                    e.preventDefault();
                    throttled(e);
                }

                // function fireScrollBar() {
                //     throttledBar();
                // }
            }
        }

        let start = new Init();
        let replace = new Resize();
        let test;
        if (!test) {
            test = new Scroll();
        }
    }
}

