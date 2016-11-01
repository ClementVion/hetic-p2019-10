class Scroll {
 constructor ( ) {
     window.addEventListener('wheel', (event) => this.scrollHorizontaly(event));
 }

 scrollHorizontaly (e) {
     var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
     document.documentElement.scrollLeft -= (delta*40); // Multiplied by 40
     document.body.scrollLeft -= (delta*40); // Multiplied by 40
     e.preventDefault();
 }
}

var test = new Scroll();
