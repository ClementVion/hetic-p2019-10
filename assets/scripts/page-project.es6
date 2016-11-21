module.exports = {

    init: function(){
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
                // document.querySelector('.singleProject').addEventListener('wheel', (event) => this.detectEnd());
                document.querySelector('.singleProject').addEventListener('wheel', (event) => this.scrollBar());

            }

            // detectEnd() {
            //     // let container = document.querySelector('.singleProject');
            //     // console.log(document.body.scrollLeft + window.innerWidth);
            //     // console.log(container.clientWidth);
            // }

            scrollBar() {
                let container = document.querySelector('.singleProject');
                let scrollbar = document.querySelector('.scrollbar');
                scrollbar.style.width = (document.body.scrollLeft  / (container.clientWidth - window.innerWidth)) * 100 + '%';
            }
        }

        let test = new Scroll();
        let scrollToNext = new ScrollToNext();
    }
}
