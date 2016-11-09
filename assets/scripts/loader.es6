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
		launchLoading('.preload')
		.then(
			function (value) {
				console.log('loaded !');
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
				setTimeout(function(){
					var progress = Math.round( (100/total)*loaded ), // percent update when an asset is loaded
						percentElm = document.querySelector('.loading__percents'), // element which contain loading percents
						loadingProgress = document.querySelector('.loading__progress');

					loadingProgress.style.transform = "translateX("+ -(100-progress) +"%)";
					percentElm.innerHTML = progress + '%';
					console.log(loadingProgress.style.transform);
					if( progress >= 100 && loaded == total && loadingProgress.style.transform == "translateX(0%)"){
						stopPreloadingAnim(); // remove preloading animation
						resolve(); // return that all images has been loaded
					}
				},2000);
			});	
	}

	/*
	*  stopPreloadingAnim()
	*  
	*  @return 
	*/

	function stopPreloadingAnim() {
		// remove loading screen
		setTimeout(function(){
			var loadingScreen = document.querySelector('.loading');
			loadingScreen.style.display = 'none';
		},300);

	}

});












