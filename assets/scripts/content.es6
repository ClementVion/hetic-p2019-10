(function(){
	let prevProject = null,
		currentProject = 0,
		slides = document.querySelectorAll('.project__imageBackground'),
		tl1 = new TimelineMax(),
		tl2 = new TimelineMax(),
		transformXValue,
	initSmoothScroll = function ()
	{	
		let throttled = _.throttle(magnet, 3000, {leading: true, trailing: false});		

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
				console.log('1 : ' + currentProject);
				selectSlide( (currentProject-1) );
			}
			if (wheelDelta < 0) {
				console.log('1 : ' + currentProject);
				selectSlide( (currentProject+1) );
			}
		}
	},
	initSlides = function ()
	{
		// return 'matrix(XX,XX,XX,XX,XX,XX)'
		// split the string to make it an array
		transformXValue = window.getComputedStyle(slides[0], null).getPropertyValue('transform'),
		transformXValue = transformXValue.split('(')[1].split(')')[0].split(',');
		transformXValue = parseInt(transformXValue[4]);
		// console.log(transformXValue);

		slides[0].style.top = '0';
		for (var i = 1; i < slides.length; i++) {
			slides[i].style.display = 'none';
		}

	},
	selectSlide = function (selectedProject)
	{
		console.log('2 : ' + selectedProject);
		// check if we have to loop
		if( selectedProject >= slides.length ) {
			selectedProject = 0;
		}
		else if( selectedProject < 0 ) {
			selectedProject = (parseInt( (slides.length) - 1 ));
		}
		console.log('3 : ' + selectedProject);
		prevProject = currentProject;
		slides[selectedProject].style.display = 'block';

		setTimeout(function(){
			console.log('4 : ' + selectedProject);
			tl1.to(slides[selectedProject], 1.2,
			{
				y: '-100%',	
			});
			setTimeout(function(){
				tl2.to(slides[prevProject], 1.2,
				{
					y: '-=100%',
					zIndex: '0',	
				});
				setTimeout(function(){
					tl2.to(slides[prevProject], 0,
					{
						display: 'none',
						top: '100%',
						transform: 'translateY(0) transformX(' + transformXValue + 'px)',
						zIndex: 1
					});
				},2400);
				console.log('5 : ' + selectedProject);
				currentProject = selectedProject;
			},50);
		},50);

},
	goToSlide = function () {
		setInterval(function(){
			selectSlide(currentProject);
		}, 3650);
	},
	init = function ()
	{
		initSmoothScroll();
		initSlides();
		// goToSlide();
		// selectSlide(3);
	};
	init();
}());
 

