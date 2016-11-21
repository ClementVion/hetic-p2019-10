module.exports = {

	init: function(){
		let tl = new TimelineMax(),
		loadingContainer = document.querySelector('.loading'),

		// Launch the detection of the loading of each assets
		launchLoading = function (cl) {
			var keys = {37: 1, 38: 1, 39: 1, 40: 1};

			function preventDefault(e) {
			  e = e || loadingContainer.event;
			  if (e.preventDefault)
			      e.preventDefault();
			  e.returnValue = false;  
			}

			function preventDefaultForScrollKeys(e) {
			    if (keys[e.keyCode]) {
			        preventDefault(e);
			        return false;
			    }
			}

			function disableScroll() {
			  if (loadingContainer.addEventListener) // older FF
			      loadingContainer.addEventListener('DOMMouseScroll', preventDefault, false);
			  loadingContainer.onwheel = preventDefault; // modern standard
			  loadingContainer.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
			  loadingContainer.ontouchmove  = preventDefault; // mobile
			  document.onkeydown  = preventDefaultForScrollKeys;
			}


			disableScroll();
			
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
						container.classList.add('loaded');
					},1000);
				} else {
					let allworks = require('./page-allworks.es6');
					setTimeout(function(){
						allworks.init();
						container.classList.add('loaded');
					}, 600);
					setTimeout(function(){
						loadingContainer.style.display = "none";
						container.classList.add('loaded');
					},1000);
				}


			},1000);
		};

		launchLoading('.preload');
	}
}
