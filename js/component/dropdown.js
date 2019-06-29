'use strict';

{
	const className = {
		OPEN: 'open',
	};

	const selector = {
		TOGGLE: '[data-toggle=dropdown]',
		FOCUSABLE: '.dropdown-menu .dropdown-item:not(:disabled)',
		DROPDOWN: '.dropdown',
	};



	const toggle = dropdown => {
		if(dropdown.classList.contains(className.OPEN)) close(dropdown);
		else open(dropdown);
	};


	const open = dropdown => {
		dropdown.classList.add(className.OPEN);
		dropdown.querySelector(selector.TOGGLE).setAttribute('aria-expanded', true);
		if(dropdown.dataset.closeOnBlur !== 'false') dropdown.addEventListener('focusout', focusout);
		dropdown.dispatchEvent(new Event('menuopen'));
	};


	const close = dropdown => {
		dropdown.classList.remove(className.OPEN);
		dropdown.querySelector(selector.TOGGLE).setAttribute('aria-expanded', false);
		dropdown.removeEventListener('focusout', focusout);
		dropdown.dispatchEvent(new Event('menuclose'));
	};


	const focusout = function(e) {
		if(e.relatedTarget && this.contains(e.relatedTarget)) return;

		close(this);
	};


	const keydown = e => {
		const dropdown = e.target.closest(selector.DROPDOWN);

		if(
			!dropdown ||
			/input|textarea/i.test(e.target.tagName) ||
			e.target.contentEditable === 'true' ||
			(!['ArrowUp', 'ArrowDown', 'Escape'].includes(e.key))
		) {
			return;
		}

		e.preventDefault();
		e.stopPropagation();

		const isOpen = dropdown.classList.contains(className.OPEN);

		if(isOpen && e.key === 'Escape') {
			dropdown.querySelector(selector.TOGGLE).focus();
			close(dropdown);
		}

		if(!isOpen) {
			open(dropdown);
		}

		const items = [...dropdown.querySelectorAll(selector.FOCUSABLE)];
		if(items.length === 0) return;
		let index = items.indexOf(e.target);

		if(e.key === 'ArrowUp') {
			index--;
		} else if(e.key === 'ArrowDown' && index < items.length - 1) {
			index++;
		}

		if(index < 0) index = 0;

		items[index].focus();
	};



	document.addEventListener('keydown', keydown);
	document.addEventListener('click', function(e) {
		if(e.target.closest(selector.TOGGLE)) toggle(e.target.closest(selector.DROPDOWN));
	});
}

