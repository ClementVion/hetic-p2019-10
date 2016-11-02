(function(){
	let prevProject = null,
		currentProject = 0,
		slides = document.querySelectorAll('.project__imageBackground'),
		tl1 = new TimelineMax(),
		tl2 = new TimelineMax(),
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
			// return 'matrix(XX,XX,XX,XX,XX,XX)'
			let transformXValue = window.getComputedStyle(slides[0], null).getPropertyValue('transform');
			// split the string to make it an array
			transformXValue = transformXValue.split('(')[1].split(')')[0].split(',');

			if (wheelDelta > 0) {

			}
			if (wheelDelta < 0){
				
			}
		}
	},
	initSlides = function ()
	{
		slides[0].classList.add('active');
		for (var i = 1; i < slides.length; i++) {
			slides[i].style.display = 'none';
		}
	},
	selectSlide = function (selectedProject)
	{
		prevProject = currentProject;
		slides[selectedProject].style.display = 'block';
		tl1.to(slides[selectedProject], 1.2,
		{
			y: '-100%',	
		});
		setTimeout(function(){
			tl2.to(slides[prevProject], 1.2,
			{
				y: '-100%',	
			})
		},50);
		setTimeout(function(){
			tl2.to(slides[prevProject], 0,
			{
				display: 'none',
				y: '+=100%'
			});
			slides[prevProject].classList.remove('active');
		},2500);

	},
	goToSlide = function () {
		setInterval(function(){
			console.log('hello');
			selectSlide(currentProject+1);
		}, 3000);
	},
	init = function ()
	{
		initSmoothScroll();
		initSlides();
		goToSlide();
		// selectSlide(4);
	};
	init();
}());
 

