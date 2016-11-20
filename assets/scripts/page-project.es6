class Init {
    constructor() {
        // TODO : refactor width screen detection
        let single = document.getElementsByClassName('singleProject')[0];
        // console.log(document.querySelector('.singleProject');
        // console.log(parseInt(getComputedStyle(document.querySelector('.singleProject').width);
        if (parseInt(getComputedStyle(single).width) > 700) {
        let main = parseInt(getComputedStyle(document.querySelector('.singleProject__main-content')).width)/2.3;
        document.querySelector('.singleProject').style.width = (main + 2000) + "px";
        }
    }
}

// TODO : refactor scroll & scroll to next (make one class?)
class Scroll {
    constructor() {
        let throttled = _.throttle(scrollHorizontaly, 25, {
            leading: false,
            trailing: true
        });

        let throttledBar = _.throttle(scrollBar, 25, {
            leading: false,
            trailing: true
        });

        window.addEventListener('wheel', fireScrollBar );
        window.addEventListener('wheel', fireScroll );

        function scrollHorizontaly(e) {
            if (parseInt(document.querySelector('.singleProject').style.width) >= 700) {
                // TODO: rename let(s)
                let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))),
                    photos = document.getElementsByClassName('singleProject__main-content'),
                    singleProject = document.querySelector('.singleProject'),
                    currentPhotos = getComputedStyle(photos[0]).transform,
                    currentSingle = getComputedStyle(singleProject).transform,
                    background =  document.getElementsByClassName('singleProject__background-container'),
                    backgroundTransform = getComputedStyle(background[0]).transform;
                currentPhotos = parseInt(currentPhotos.split(" ")[4]);
                currentSingle = parseInt(currentSingle.split(" ")[4]);
                backgroundTransform = parseInt(backgroundTransform.split(" ")[4]);
                    if ((currentSingle + delta * 15 <= 0) && (currentSingle + delta * 15) - window.innerWidth > (parseInt(singleProject.style.width) *-1)) {
                        singleProject.style.transform = "matrix(1, 0, 0, 1, " + (currentSingle + delta * 15) + ", 0)";
                        photos[0].style.transform = "matrix(1, 0, 0, 1, " + (currentPhotos + delta * 20) + ", 0)";
                    }
                    if (backgroundTransform > -400 && delta < 0) {
                        // background.style.transform = "matrix(1, 0, 0, 1, " + 0 + ", 0)";
                        document.querySelector('.singleProject__background-container').classList.add('singleProject__background-container--visible');
                        document.querySelector('.singleProject__header').classList.add('singleProject__header--hidden');
                    }
                    else if(backgroundTransform == 0 && currentSingle > -400 && delta >= 0 ) {
                        // background.style.transform = "matrix(1, 0, 0, 1, " + 670 + ", 0)";
                        document.querySelector('.singleProject__background-container').classList.remove('singleProject__background-container--visible');
                        document.querySelector('.singleProject__header').classList.remove('singleProject__header--hidden');
                    }
                e.preventDefault();
            }
        }

        function scrollBar() {
            let container = document.querySelector(".singleProject");
            let scrollbar = document.getElementsByClassName('scrollbar');
            let currentScroll = getComputedStyle(container).transform;
            currentScroll = parseInt(currentScroll.split(" ")[4]);
            // scrollbar[0].style.transform = "translateZ(0) scaleX("+(currentScroll*-1 / (parseInt(getComputedStyle(container).width) - window.innerWidth))+")";
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
        let percentage = ((currentScroll*-1) / (parseInt(getComputedStyle(container).width) - window.innerWidth) * 100) < 10;
        // if (cu) {
            // document.querySelector('.singleProject__background-container').classList.add('singleProject__background-container--translated');
            // document.querySelector('.singleProject__main-content').classList.add('singleProject__main-content--translated');
        // }
        if (((currentScroll*-1) / (parseInt(getComputedStyle(container).width) - window.innerWidth) * 0) >= 99) {
            console.log("END");
        }
    }
}

// TODO : wait for the dom to be loaded to start init
setTimeout(function(){
    let init = new Init();
},1000);

// TODO : wait for init to be executed to start scroll and scroll to next
setTimeout(function(){
    let test = new Scroll();
},1500);

setTimeout(function(){
    let scrollToNext = new ScrollToNext();
},1500);
