'use strict';

{
	const className = {
		SELECTED: 'active',
	};

	const selector = {
		CONTAINER: '.tabs',
		TAB: '.tabs-nav [role=tab]',
		PANEL: '[role=tabpanel]',
	};



	const activate = tab => {
		const container = tab.closest(selector.CONTAINER);

		// Deactivate active tabs and panels
		[...container.querySelectorAll(selector.TAB)].forEach(tab => {
			tab.setAttribute('tabindex', '-1');
			tab.setAttribute('aria-selected', 'false');
			tab.classList.remove(className.SELECTED);
		});
		Array.from(container.children).filter(el => el.matches(selector.PANEL)).forEach(panel => {
			panel.hidden = true;
		});

		// Activate current tab
		tab.setAttribute('tabindex', '0');
		tab.setAttribute('aria-selected', 'true');
		tab.classList.add(className.SELECTED);
		document.getElementById(tab.getAttribute('aria-controls')).hidden = false;
	};


	const keydown = e => {
		const tab = e.target.closest(selector.TAB);

		if(
			!tab ||
			(!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key))
		) {
			return;
		}

		e.preventDefault();
		e.stopPropagation();

		const container = tab.closest(selector.CONTAINER);
		const tabs = [...container.querySelectorAll(selector.TAB)];

		if(tabs.length < 2) return;
		let index = tabs.indexOf(tab);

		if(e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
			index--;
		} else if((e.key === 'ArrowDown' || e.key === 'ArrowRight') && index < tabs.length - 1) {
			index++;
		}

		if(index < 0) index = 0;

		tabs[index].focus();
	};



	document.addEventListener('keydown', keydown);
	document.addEventListener('click', function(e) {
		const tab = e.target.closest(selector.TAB);
		if(tab) activate(tab);
	});
}

