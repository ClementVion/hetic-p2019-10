module.exports = {

  init: () => {
    const titles = document.querySelectorAll('.allWorks__list a');
    const imgs = document.querySelectorAll('.allWorks__image');

    /**
    * Initialize hovers on projects links
    * @returns {void}
    */
    function initHovers() {
      for (const img of imgs.keys()) {
        titles[img].addEventListener('mouseenter', () => {
          imgs[img].classList.add('allWorks__image--visible');
        });
        titles[img].addEventListener('mouseout', function checkChildren(event) {
          const o = event.toElement || event.relatedTarget;
          if (o.parentNode === this || o === this) {
            return;
          }
          imgs[img].classList.remove('allWorks__image--visible');
        });
      }
    }
    initHovers();
  },
};
