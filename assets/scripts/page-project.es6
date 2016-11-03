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
        console.log(document.body.scrollLeft);
        console.log(container.clientWidth);
    }
}

var test = new Scroll();
var scrollToNext = new ScrollToNext();
