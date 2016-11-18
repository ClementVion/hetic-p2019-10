class Init {
    constructor() {
        // TODO : refactor width screen detection
        if (parseInt(document.querySelector('.singleProject').style.width) >= 700) {
        document.querySelector('.singleProject').style.width = (parseInt(getComputedStyle(document.querySelector('.singleProject')).width)) + (parseInt((getComputedStyle(document.querySelector('.singleProject__main-content'))).width)/2);
        }
    }
}

// TODO : refactor scroll & scroll to next (make one class?)
class Scroll {
    constructor() {
        window.addEventListener('wheel', (event) => this.scrollHorizontaly(event));
    }

    scrollHorizontaly(e) {
        if (parseInt(document.querySelector('.singleProject').style.width) >= 700) {
            // TODO: rename let(s)
            let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))),
                photos = document.getElementsByClassName('singleProject__main-content'),
                singleProject = document.querySelector('.singleProject'),
                currentPhotos = getComputedStyle(photos[0]).transform,
                currentSingle = getComputedStyle(singleProject).transform;

            currentPhotos = parseInt(currentPhotos.split(" ")[4]);
            currentSingle = parseInt(currentSingle.split(" ")[4]);

                if ((currentSingle + delta * 10 <= 0) && (currentSingle + delta * 10) - window.innerWidth > (parseInt(singleProject.style.width) *-1)) {
                    for( var i = 0; i< photos.length ;i++) {
                        photos[i].style.transform = "matrix(1, 0, 0, 1, " + (currentPhotos + delta * 15) + ", 0)";
                    }
                    singleProject.style.transform = "matrix(1, 0, 0, 1, " + (currentSingle + delta * 10) + ", 0)";
                }
            e.preventDefault();
    }}
}

class ScrollToNext {
    constructor() {
        window.addEventListener('wheel', (event) => this.detectEnd());
        window.addEventListener('wheel', (event) => this.scrollBar());

    }
    detectEnd() {
        let container = document.querySelector(".singleProject");
        let currentScroll = getComputedStyle(container).transform;
        currentScroll = parseInt(currentScroll.split(" ")[4]);
        if (((currentScroll*-1) / (parseInt(getComputedStyle(container).width) - window.innerWidth) * 100) >= 99) {
            console.log("END");
        }
    }

    scrollBar() {
        let container = document.querySelector(".singleProject");
        let scrollbar = document.querySelector('.scrollbar');
        let currentScroll = getComputedStyle(container).transform;
        currentScroll = parseInt(currentScroll.split(" ")[4]);
        scrollbar.style.width = (currentScroll)*-1 / (parseInt(getComputedStyle(container).width) - window.innerWidth) * 100 + "%";
    }
}

// TODO : wait for the dom to be loaded to start init
setTimeout(function(){
    let init = new Init();
},1500);

// TODO : wait for init to be executed to start scroll and scroll to next
setTimeout(function(){
    let test = new Scroll();
},2500);

setTimeout(function(){
    let scrollToNext = new ScrollToNext();
},2500);
