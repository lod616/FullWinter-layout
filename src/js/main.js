/*import libs*/
//= libs/libs.js


//header-search
function ShowHeaderSearch(){
	let headerSearchIcon = document.querySelector('.search-icon__wrapper');
	let headerSearchInput = document.querySelector('.search-form__txt');
	let headerCloseIcon = document.querySelector('.close-search-icon');
	headerSearchIcon.addEventListener('click', () => {
		headerSearchInput.classList.toggle('search-form__txt--active');headerSearchInput.focus();
		headerSearchInput.focus();
		headerCloseIcon.classList.toggle('close-search-icon--active');
	});
};
ShowHeaderSearch();

function clearSearchForm(){
	let headerCloseIcon = document.querySelector('.close-search-icon');
	let headerSearchInput = document.querySelector('.search-form__txt');

	headerCloseIcon.addEventListener('click', () => {
		headerSearchInput.value = ('');
	});
}
clearSearchForm();




//custom pagination top banner slider
let topBannerPagination = ['', '', ''];

//top-banner slider
let topBannerSlider = new Swiper ('.top-banner-js__slider', {
	// Optional parameters
	loop: true,
	direction: 'vertical',
	slidesPerView: 1,
	autoHeight: true,
	//centeredSlides: true,

	// If we need pagination
	pagination: {
		el: '.top-banner__slider-pagination',
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '">' + (topBannerPagination[index]) + '</span>';
 		},
	},

});






let newArrivalsSlider = new Swiper ('.new-arrivals-js__slider', {
	// Optional parameters
	loop: true,

	// If we need pagination
	pagination: {
		el: '.products-dots',
		clickable: true,
		type: 'bullets',
	},

});





function sizeListItem(){
	let sizeList = document.querySelectorAll('.size-list__item');
	sizeList.forEach(function(item) {
		item.addEventListener('click', function(){
			this.classList.toggle('size-list__item--active');
		});
	});
};
sizeListItem();


function showMenuBurger(){
	let headerBurger = document.querySelector('.header-burger');
	let headerMenu = document.querySelector('.header-main__list');
	headerBurger.addEventListener('click', () =>{
		headerBurger.classList.toggle('header-burger--active');
		headerMenu.classList.toggle('header-main__list--active');
	});
};
showMenuBurger();

//custom pagination product-view slider
let productViewPagination = ['', '', ''];

//product slider
let productViewSlider = new Swiper ('.product-js__slider', {
	// Optional parameters
	loop: true,
	slidesPerView: 1,

	// If we need pagination
	pagination: {
		el: '.js-product-view__pager',
		clickable: true,
		renderBullet: function (index, className) {
			return '<span class="' + className + '">' + (productViewPagination[index]) + '</span>';
 		},
	},

});

