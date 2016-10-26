document.addEventListener('DOMContentLoaded', function(){

	/*
	*  manageLoadings()
	*  Manage loads of assets in order of appearance in user path
	*  @param 
	*  @return 
	*/

	manageLoadings();

	function manageLoadings() {
		// load the first images during preloading
		launchLoading('.images-while-preload')
		.then(
			function (value) {
				console.log('first');
				// launch load of next images
				launchLoading('.images-after-preload')
				.then(
					function (value) { 
						console.log('second');
					});
			});
	}


	/*
	*  launchLoading()
	*  Launch the detection of the loading of each assets
	*  @param string, class of elements that must wait loading
	*  @return bool
	*/

	function launchLoading(cl){
		return new Promise(
			function (resolve) {
				var assets = document.querySelectorAll(cl), // Get assets
					promisesResolved = 0; // number of promises resolved updated at each iteration
				for (var elm of assets) {
				    loadAssets(elm)
			    	.then( 
			    		function(value) { 
			    			// update load progress
			    			promisesResolved++;
			    			updateLoadProgress(promisesResolved, assets.length)
			    			.then(
			    				function (value) {
			    					resolve(); // return that all images has been loaded to trigger next action
			    				});
			    		}	
				    );
				}

				// Promise.all(promises).then(function() { // check if all promises are resolved
				// 	resolve('Images succefully loaded'); // return loads success
				// }).catch(function(err) {
		  //   		reject(err)
		  // 		});
		  	}
	  	)
	}

	/*
	*  loadAssets()
	*  Detect if one asset is loaded 
	*  @param object, DOM element
	*  @return resolve() or reject()
	*/

	function loadAssets(elm) {
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
	}

	/*
	*  updateLoadProgress()
	*  Update the percentage of preloading progress
	*  @param int, number of assets currently loaded
	*  @param int, total numbers of assets to load
	*  @return 
	*/

	function updateLoadProgress(loaded, total) {
		return new Promise(
			function (resolve) {
				var percentStep = Math.round( (100/total)*loaded ), // percent update when an asset is loaded
					elm = document.querySelector('.loading__percents'), // element which contain loading percents
					percent = parseInt(elm.innerHTML), // get current loading
					loadingProgress = document.querySelector('.loading__progress'),
					interval = setInterval(function(){ 
						// update current loading
						percent = parseInt(elm.innerHTML);
						if( percent < percentStep ) {
							percent++;
							var progress = -(100 - percent);
							loadingProgress.style.transform = "translateX("+ progress +"%)";
							elm.innerHTML = percent + '';
						}
						if( percent >= 100 && loaded == total){
							stopPreloadingAnim(); // remove preloading animation
							resolve(); // return that all images has been loaded
							window.clearInterval(interval);
						}
					}, 50);
			});	
	}

	/*
	*  stopPreloadingAnim()
	*  
	*  @return 
	*/

	function stopPreloadingAnim() {
		// remove loading screen
		var loadingScreen = document.querySelector('.loading');
		// loadingScreen.style.display = 'none';
	}

});
















