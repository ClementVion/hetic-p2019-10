(function(){
    // Index of slides
    let prevProject = null,
        currentProject = 0,
        // Get Elements to animate
        slides = document.querySelectorAll('.project__imageBackground'),
        frontSlides = document.querySelectorAll('.project__imageFront'),
        titlesSlides = document.querySelectorAll('.project__title'),
        chapters = document.querySelectorAll('.carousel__option'),
        // Timelines for tweenmax
        tl1 = new TimelineMax(), 
        tl2 = new TimelineMax(),
        // Prevents glitch with scroll
        isScrolling = false,
    
    // Detect and launch scroll animations
    initSmoothScroll = function ()
    {   
        let throttled = _.throttle(magnet, 2000, {leading: true, trailing: false});     

        let slidesContainer = document.querySelector('.project__imageBox');
        let frontSlides = document.querySelectorAll('.project__imageFront');

        document.addEventListener('mousewheel', updatePosition);    
        
        function updatePosition(e)
        {
            e.preventDefault();
            throttled(e.wheelDelta);
        }

        function magnet(wheelDelta)
        {   
            if (wheelDelta > 0) {
                selectSlide( (currentProject-1) );
            }
            if (wheelDelta < 0) {
                selectSlide( (currentProject+1) );
            }
        }
    },

    // Get slides and init theirs styles
    initSlides = function ()
    {
        frontSlides[0].style.top = '0';
        slides[0].style.top = '0';
        titlesSlides[0].style.top = '0';

        for (let j = 1; j < frontSlides.length; j++) {
            frontSlides[j].style.display = 'none';
        }
        for (let i = 1; i < slides.length; i++) {
            slides[i].style.display = 'none';
        }
        for (let k = 1; k < titlesSlides.length; k++) {
            titlesSlides[k].style.display = 'none';
        }

    },

    // Go to a slide with animations depending an index
    selectSlide = function (selectedProject)
    {
        // check if we have to loop
        if( selectedProject >= slides.length ) {
            selectedProject = 0;
        }
        else if( selectedProject < 0 ) {
            selectedProject = (parseInt( (slides.length) - 1 ));
        }
        prevProject = currentProject;
        slides[selectedProject].style.display = 'block';
        frontSlides[selectedProject].style.display = 'block';
        titlesSlides[selectedProject].style.display = 'block';

        setTimeout(function(){
            isScrolling = true;
            tl1.to(slides[selectedProject], 0.3,
            {
                y: '-100%', 
            });         
            tl1.to(frontSlides[selectedProject], 0.2,
            {
                y: '-100%', 
            }, '-=0.1');            
            tl1.to(titlesSlides[prevProject], 0.4,
            {
                y: '100%',  
            }, '-= 0.4');
            setTimeout(function(){
                tl2.to(slides[prevProject], 0.3,
                {
                    y: '-=100%',
                    zIndex: '0',    
                });
                tl2.to(frontSlides[prevProject], 0.2,
                {
                    y: '-=100%',
                    zIndex: '0',    
                }, '-=0.1');
                tl2.to(titlesSlides[selectedProject], 0.4,
                {
                    y: '-=100%',
                    zIndex: '0',    
                }, '-=0.4');
                setTimeout(function(){
                    tl2.to(slides[prevProject], 0,
                    {
                        display: 'none',
                        top: '100%',
                        transform: 'translateY(0)',
                        zIndex: 1
                    });                 
                    tl2.to(frontSlides[prevProject], 0,
                    {
                        display: 'none',
                        top: '100%',
                        transform: 'translateY(0)',
                        zIndex: 1
                    });
                    tl2.to(titlesSlides[prevProject], 0,
                    {
                        display: 'none',
                        top: '100%',
                        transform: 'translateY(0)',
                        zIndex: 1
                    });
                    isScrolling = false;
                },1200);
                switchChapters(currentProject, selectedProject);
                currentProject = selectedProject;
            },20);
        },20);

    },

    // Automatic scrolling
    automaticScroll = function () {
        setInterval(function(){
            selectSlide(currentProject);
        }, 3650);
    },

    // Scroll with numbers on the right
    chaptersScroll = function () {
        for (let i = 0 ; i < chapters.length; i++){
            chapters[i].addEventListener('click', function(){
                let selectedChapter = parseInt(this.getAttribute('data-chapter')-1 );
                if( selectedChapter != currentProject && isScrolling == false) {
                    selectSlide( selectedChapter );
                    switchChapters(currentProject, selectedChapter);
                }
            });
        }
    },

    // Chapters selection with numbers on the right
    switchChapters = function(toRemove, toAdd) {
        chapters[toRemove].classList.remove('carousel__option--on');
        chapters[toAdd].classList.add('carousel__option--on');
    },

    // Init scrolling for home page
    init = function ()
    {
        initSmoothScroll();
        initSlides();
        chaptersScroll();
        // automaticScroll();
        // selectSlide(3);
    };
    init();
}());
 

