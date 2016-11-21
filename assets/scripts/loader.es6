module.exports = {

	init: function(){
		let tl = new TimelineMax(),
		loadingContainer = document.querySelector('.loading'),

		// Launch the detection of the loading of each assets
		launchLoading = function (cl) {
			let assets = document.querySelectorAll(cl), // Get assets
				promisesResolved = 0; // number of promises resolved updated at each iteration
			preventLazyload(assets)
			loadingContainer.style.display = "block";
			for (var elm of assets) {
			    loadAssets(elm)
		    	.then(
		    		function(value) {
		    			// update load progress
		    			promisesResolved++;
		    			updateLoadProgress(promisesResolved, assets.length);
		    		}
			    );
			}
		},

		// Prevent lazyload in ordre to permit preload
		preventLazyload = function (assets) {
			for (var elm of assets) {
				elm.src = elm.getAttribute('data-src');
				elm.classList.toggle('lazyload');
			}
		},

		// Detect if one asset is loaded
		loadAssets = function (elm) {
			return new Promise(
				function (resolve) {
					// if image is already loaded
					if(elm.complete == true){
						resolve();
					}
					// Add event listeners
					elm.addEventListener('load', function(){
						resolve();
					});
				});
		},

		// Update the percentage of preloading progress
		updateLoadProgress = function (loaded, total) {
			return new Promise(
				function (resolve) {
					setTimeout(function(){
						let progress = Math.round( (100/total)*loaded ), // percent update when an asset is loaded
							percentElm = document.querySelector('.loading__percents'), // element which contain loading percents
							loadingProgress = document.querySelector('.loading__progress');

						loadingProgress.style.transform = "translateX("+ -(100-progress) +"%)";
						percentElm.innerHTML = progress;
						if( progress >= 100 && loaded == total && loadingProgress.style.transform == "translateX(0%)"){
							stopPreloadingAnim(); // remove preloading animation
							resolve(); // return that all images have been loaded
						}
					},2000);
				});
		},


		stopPreloadingAnim = function () {
			// remove loading screen
			let container = document.querySelector('.container');
			setTimeout(function(){
				let content = document.querySelector('.content'),
					loadingContainer = document.querySelector('.loading'),
					loadingLayout = loadingContainer.querySelector('.loading__layout');

				loadingLayout.style.transform = "translateX(0%)";
				loadingContainer.style.opacity = "0";

				if( content.classList.contains('home') ) {
					let home = require('./page-home.es6');
					setTimeout(function(){
						home.init();
						container.classList.add('loaded');
					}, 600);
					setTimeout(function(){
						loadingContainer.style.display = "none";
						// let projectSee = document.querySelector('.project__see'),
						// 	menu = document.querySelectorAll('.menu li');
						// tl.to(projectSee, 0.7,
						// {
						// 	opacity: '1',
						// 	x: '0'
						// }, '0.8');
					}, 800);
				}
				else if( content.classList.contains('pageProject') ) {
					let project = require('./page-project.es6');
					console.log('project');
					setTimeout(function(){
						project.init();
						container.classList.add('loaded');
					}, 600);
					setTimeout(function(){
						var projectHeader = document.querySelector('.singleProject__header'),
						projectTitle = projectHeader.querySelector('.singleProject__title'),
						projectCard= projectHeader.querySelector('.singleProject__card'),
						projectScroll= projectHeader.querySelector('.singleProject__scroll');
						loadingContainer.style.display = "none";
						tl.to(projectTitle, 0.6,
						{
							x: '0',
							opacity: '0.03'
						});
						tl.to(projectCard, 0.3,
						{
							opacity: '1'
						}, '-=0.3');
						tl.to(projectScroll, 0.2,
						{
							opacity: '0.33'
						});
					},1000);
				}


			},1000);
		};

		launchLoading('.preload');
	}
}
