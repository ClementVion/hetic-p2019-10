module.exports = {

  init: () => {
    const titles = document.querySelectorAll('.allWorks__list a');
    const imgs = document.querySelectorAll('.allWorks__image');

    /**
    * Initialize hovers on projects links
    * @returns {void}
    */
    function initHovers() {
      for (let img of imgs.keys()) {
        titles[img].addEventListener('mouseenter', () => {
          imgs[img].classList.add('allWorks__image--visible');
        });
        titles[img].addEventListener('mouseout', function checkChildren(event) {
          const e = event.toElement || event.relatedTarget;
          if (e.parentNode === this || e === this || e.parentNode.parentNode === this) {
            return;
          }
          imgs[img].classList.remove('allWorks__image--visible');
        });
      }
    }

    if (parseInt(getComputedStyle(document.querySelector('.container')).width, 10) >= 700) {
      initHovers();
    } else {
      const allTags = document.querySelector('body').getElementsByTagName('*');
      for (var i = 0, len = allTags.length; i < len; i++) {
          // allTags[i] is an element within the container object
          // allTags[i].id is the id of the element (if there is one)
        allTags[i].classList.add('notransition');
      }
    }
  },
};
