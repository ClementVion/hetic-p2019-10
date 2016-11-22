module.exports = {

  init: () => {
    const titles = document.querySelectorAll('.allWorks__list a');
    const imgs = document.querySelectorAll('.allWorks__image');

    function initHovers() {
      for (let i = 0; i < imgs.length; i++) {
        titles[i].addEventListener('mouseenter', () => {
          imgs[i].classList.add('allWorks__image--visible');
        });
        titles[i].addEventListener('mouseout', function checkChildren(event) {
          const o = event.toElement || event.relatedTarget;
          if (o.parentNode === this || o === this) {
            return;
          }
          imgs[i].classList.remove('allWorks__image--visible');
        });
      }
    }
    initHovers();
  },
};
