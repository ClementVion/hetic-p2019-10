module.exports = {
    init: function(){
        class Init {
            constructor() {
            }
        }

        // TODO : refactor scroll & scroll to next (make one class?)
        class Scroll {
            constructor() {
                let throttled = _.throttle(scrollHorizontaly, 20, {
                    leading: false,
                    trailing: true
                });

                let throttledBar = _.throttle(scrollBar, 20, {
                    leading: false,
                    trailing: true
                });

                window.addEventListener('wheel', fireScrollBar );
                window.addEventListener('wheel', fireScroll );

                function scrollHorizontaly(e) {
                    if (parseInt(getComputedStyle(document.querySelector('.singleProject')).width) >= 700) {
                        let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))),
                            singleProject = document.querySelector('.singleProject'),
                            currentSingle = getComputedStyle(singleProject).transform,
                            background =  document.getElementsByClassName('singleProject__background-container'),
                            backgroundTransform = getComputedStyle(background[0]).transform;

                        currentSingle = parseInt(currentSingle.split(" ")[4]);

                        backgroundTransform = parseInt(backgroundTransform.split(" ")[4]);

                        console.log(currentSingle);
                        console.log(parseInt(getComputedStyle(singleProject).width));

                            if ((currentSingle + (delta * 5) <= 0 && ((currentSingle + delta * 10) * -1) <= (parseInt(getComputedStyle(singleProject).width) - window.innerWidth))) {
                                singleProject.style.transform = "matrix(1, 0, 0, 1, " + (currentSingle + delta * 25) + ", 0)";
                            }
                            else {
                                console.log('END');
                            }
                            if (currentSingle > (-500) && delta < 0) {
                                document.querySelector('.singleProject__header').classList.add('singleProject__header--hidden');
                            }
                            if(currentSingle == 0 && currentSingle > -400 && delta >= 0 ) {
                                document.querySelector('.singleProject__header').classList.remove('singleProject__header--hidden');
                            }

                            if ((currentSingle > -800 && currentSingle < -400 && delta < 0) || (currentSingle < -800 && delta > 0) ) {
                                document.querySelector('.singleProject__background-container').classList.add('singleProject__background-container--visible');
                            }
                            if ((currentSingle < (parseInt(getComputedStyle(singleProject).width)- window.innerWidth - 800 )*-1 && delta < 0) || (currentSingle > (-800) && delta > 0)  ) {
                                document.querySelector('.singleProject__background-container').classList.remove('singleProject__background-container--visible');
                            }

                        e.preventDefault();
                    }
                }

                function scrollBar() {
                    let container = document.querySelector(".singleProject");
                    let scrollbar = document.getElementsByClassName('scrollbar');
                    let currentScroll = getComputedStyle(container).transform;
                    currentScroll = parseInt(currentScroll.split(" ")[4]);
                    console.log((currentScroll)*-1 / (parseInt(getComputedStyle(container).width) - window.innerWidth) * 100 + "%");
                    scrollbar[0].style.width = (currentScroll)*-1 / (parseInt(getComputedStyle(container).width) - window.innerWidth) * 100 + "%";
                }

                function fireScroll(e) {
                    e.preventDefault();
                    throttled(e);
                }

                function fireScrollBar(){
                    throttledBar();
                }
            }
        }

        class ScrollToNext {
            constructor() {
                window.addEventListener('wheel', (event) => this.detectEnd());
                // window.addEventListener('wheel', (event) => this.scrollBar());
            }

            detectEnd() {
                let container = document.querySelector(".singleProject");
                let currentScroll = getComputedStyle(container).transform;
                currentScroll = parseInt(currentScroll.split(" ")[4]);
                // let percentage = ((currentScroll*-1) / (parseInt(getComputedStyle(container).width) - window.innerWidth) * 100) < 10;
            }
        }

        let test = new Scroll();
    }
}
