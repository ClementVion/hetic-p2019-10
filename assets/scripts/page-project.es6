class Scroll {
 constructor ( ) {
     window.addEventListener('wheel', (event) => this.scrollHorizontaly(event));
 }

 scrollHorizontaly (e) {
     var container = document.querySelector(".singleProject");
     var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
     document.documentElement.scrollLeft -= (delta*25);
     document.body.scrollLeft -= (delta*25);
     e.preventDefault();
 }
}

class ScrollToNext {
    constructor() {
        window.addEventListener('wheel', (event) => this.detectEnd());
    }

    detectEnd(){
        var container = document.querySelector(".singleProject");
        if (document.body.scrollLeft >= container.clientWidth) {
            console.log("ENDENDEND");
        }
    }
}

var test = new Scroll();
var scrollToNext = new ScrollToNext();
