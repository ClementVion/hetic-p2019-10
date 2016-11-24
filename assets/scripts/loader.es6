module.exports = {

  init: () => {
    const loadingContainer = document.querySelector('.loading');
    const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };
    const container = document.querySelector('.container');
    /**
    * Prevent default behavior
    * Fired on mousewheel
    * @param{object} e the event
    * @returns {void}
    */
    function preventDefault(e) {
      const o = e || loadingContainer.event;
      if (o.preventDefault) {
        o.preventDefault();
        o.returnValue = false;
      }
    }

    /**
    * Prevent default behavior of scrolling keys
    * Fired when the when a key is pushed
    * @param{object} e the event
    * @returns {void}
    */
    function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
      }
    }

    /**
    * Disable the scroll
    * Fired when the loader appears
    * @returns {void}
    */
    function disableScroll() {
      if (loadingContainer.addEventListener) {
        loadingContainer.addEventListener('DOMMouseScroll', preventDefault, false);
        loadingContainer.onwheel = preventDefault; // modern standard
        loadingContainer.onmousewheel = loadingContainer.onmousewheel = preventDefault;
        loadingContainer.ontouchmove = preventDefault; // mobile
        loadingContainer.onkeydown = preventDefaultForScrollKeys;
      }
    }

    /**
    * Enable the scroll
    * Fired when the loader fades
    * @returns {void}
    */
    function enableScroll() {
      if (loadingContainer.removeEventListener) {
        loadingContainer.removeEventListener('DOMMouseScroll', preventDefault, false);
        loadingContainer.onmousewheel = loadingContainer.onmousewheel = null;
        loadingContainer.onwheel = null;
        loadingContainer.ontouchmove = null;
        loadingContainer.onkeydown = null;
      }
    }


    /**
    * Prevent lazyload in ordre to permit preload
    * @param{array} assets the assets to load
    * @returns {void}
    */
    function preventLazyload(assets) {
      for (const elm of assets) {
        elm.src = elm.getAttribute('data-src');
        elm.classList.toggle('lazyload');
      }
    }


    /**
    * Detect if one asset is loaded
    * @param{object} elm ADD DESCRIPTION
    * @returns {void}
    */
    function loadAssets(elm) {
      return new Promise(
        (resolve) => {
          // if image is already loaded
          if (elm.complete === true) {
            resolve();
          }
          // Add event listeners
          elm.addEventListener('load', () => {
            resolve();
          });
        },
      );
    }

    /**
    * Update the percentage of preloading progress
    * @returns {void}
    */
    function stopPreloadingAnim() {
    // remove loading screen
      setTimeout(() => {
        const content = document.querySelector('.content');
        const loadingLayout = loadingContainer.querySelector('.loading__layout');

        loadingLayout.style.transform = 'translateX(0%)';
        loadingContainer.style.opacity = '0';

        container.classList.remove('container--visible');
        setTimeout(() => {
          container.classList.add('container--visible');
        }, 1000);

        if (content.classList.contains('home')) {
          const home = require('./page-home.es6');
          setTimeout(() => {
            home.init();
            container.classList.add('loaded');
          }, 600);
          setTimeout(() => {
            loadingContainer.style.display = 'none';
            enableScroll();
          }, 800);
        } else if (content.classList.contains('pageProject')) {
          const project = require('./page-project.es6');
          setTimeout(() => {
            project.init();
            container.classList.add('loaded');
          }, 600);
          setTimeout(() => {
            loadingContainer.style.display = 'none';
            enableScroll();
            container.classList.add('loaded');
          }, 1000);
        } else {
          const allworks = require('./page-allworks.es6');
          setTimeout(() => {
            allworks.init();
            container.classList.add('loaded');
          }, 600);
          setTimeout(() => {
            loadingContainer.style.display = 'none';
            enableScroll();
            container.classList.add('loaded');
          }, 1000);
        }
      }, 1000);
    }


    /**
    * Update the percentage of preloading progress
    * @param {int} loaded the number of loaded assets
    * @param {int} total the total number of assets.
    * @returns {void}
    */
    function updateLoadProgress(loaded, total) {
      return new Promise(
      (resolve) => {
        setTimeout(() => {
          const progress = Math.round((100 / total) * loaded); // update when asset is loaded
          const percentElm = document.querySelector('.loading__percents'); // element which contain loading percents
          const loadingProgress = document.querySelector('.loading__progress');

          loadingProgress.style.transform = `translateX(-${100 - progress}%)`;
          percentElm.innerHTML = progress;
          if (progress >= 100 && loaded === total && loadingProgress.style.transform === 'translateX(0%)') {
            stopPreloadingAnim(); // remove preloading animation
            resolve(); // return that all images have been loaded
          }
        }, 2000);
      });
    }


  /**
   * Launch the detection of the loading of each assets
   * @param {string} cl the class of the assets to load.
   * @returns {void}
   */
    function launchLoading(cl) {
      scroll(0,0)
      container.classList.remove('container--visible');
      disableScroll();
      const assets = document.querySelectorAll(cl); // Get assets
      let promisesResolved = 0; // number of promises resolved updated at each iteration
      preventLazyload(assets);
      loadingContainer.style.display = 'block';
      for (const elm of assets) {
        loadAssets(elm)
        .then(
          (value) => {
          // update load progress
            promisesResolved += 1;
            updateLoadProgress(promisesResolved, assets.length);
          },
        );
      }
    }

    launchLoading('.preload');
  },
};
