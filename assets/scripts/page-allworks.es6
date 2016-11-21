module.exports = {
	
	init: function() {
		let titles = document.querySelectorAll('.allWorks__list h2'),
			imgs = document.querySelectorAll('.allWorks__image'),
			title = document.querySelector('.allWorks__title'),

		initHovers = function() {
			for(let i = 0; i < imgs.length ; i++) {
				titles[i].addEventListener('mouseenter', function() {
					imgs[i].classList.add('allWorks__image--visible');
				});
				titles[i].addEventListener('mouseout', function() {
					imgs[i].classList.remove('allWorks__image--visible');
				});
			}
		};

		initHovers();
	}

}