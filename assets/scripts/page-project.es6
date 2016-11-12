class Scroll {
    constructor() {
        window.addEventListener('wheel', (event) => this.scrollHorizontaly(event));
    }

    scrollHorizontaly(e) {
        if (parseInt(document.querySelector('.project').offsetWidth) >= 700) {
            var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
            document.documentElement.scrollLeft -= (delta * 25);
            document.body.scrollLeft -= (delta * 25);
            e.preventDefault();
        }
    }
}

class ScrollToNext {
    constructor() {
        window.addEventListener('wheel', (event) => this.detectEnd());
        window.addEventListener('wheel', (event) => this.scrollBar());

    }

    detectEnd() {
        let container = document.querySelector(".project");
        console.log(document.body.scrollLeft + window.innerWidth);
        console.log(container.clientWidth);
        if (document.body.scrollLeft + window.innerWidth >= container.clientWidth) {
            console.log("END");
        }
    }

    scrollBar() {
        let container = document.querySelector(".project");
        let scrollbar = document.querySelector('.scrollbar');
        scrollbar.style.width = ((document.body.scrollLeft + window.innerWidth) / container.clientWidth) * 100 + "%";
    }
}
var test = new Scroll();
var scrollToNext = new ScrollToNext();
