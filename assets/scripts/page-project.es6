module.exports = {

    init: function() {
        class Scroll {
            constructor() {
                document.querySelector('.singleProject').addEventListener('wheel', (event) => this.scrollHorizontaly(event));
            }

            scrollHorizontaly(e) {
                if (parseInt(document.querySelector('.singleProject').offsetWidth) >= 700) {
                    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
                    document.documentElement.scrollLeft -= (delta * 25);
                    document.body.scrollLeft -= (delta * 25);
                    e.preventDefault();
                }
            }
        }


        class ScrollToNext {
            constructor() {
                document.querySelector('.singleProject').addEventListener('wheel', (event) => this.detectEnd());
                document.querySelector('.singleProject').addEventListener('wheel', (event) => this.scrollBar());

            }

            detectEnd() {
                let container = document.querySelector('.singleProject');
                console.log(document.body.scrollLeft + window.innerWidth);
                console.log(container.clientWidth);
                if (document.body.scrollLeft + window.innerWidth >= container.clientWidth) {
                    console.log("END");
                }
            }

            scrollBar() {
                let container = document.querySelector('.singleProject');
                let scrollbar = document.querySelector('.scrollbar');
                console.log('scrollLEft: ' + document.body.scrollLeft);
                console.log('windowWidth :' + window.innerWidth);
                console.log('containerWidth :' + container.clientWidth);
                scrollbar.style.width = (document.body.scrollLeft  / (container.clientWidth - window.innerWidth)) * 100 + '%';
            }
        }

        let test = new Scroll();
        let scrollToNext = new ScrollToNext();
    },
    stopEvents: function() {
        var el = document.querySelector('.container'),
        elClone = el.cloneNode(true);
        el.parentNode.replaceChild(elClone, el);
    }
}