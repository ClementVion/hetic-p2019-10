class Scroll {
 constructor ( ) {
     window.addEventListener('wheel', (event) => this.scrollHorizontaly(event));
 }

 scrollHorizontaly (e) {
     var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
     document.documentElement.scrollLeft -= (delta*12);
     document.body.scrollLeft -= (delta*12);
     e.preventDefault();
 }
}


var test = new Scroll();
if (test) {
    document.documentElement.scrollLeft -= (delta*1);
    document.body.scrollLeft -= (delta*1);
}
