'use strict';

{
	const selector = {
		TOGGLE: '[data-toggle="dialog"]',
		DIALOG: '.dialog-overlay',
		FOCUSABLE: 'button, a[href], input, textarea, tabindex, contenteditable',
		DISMISS: '[data-dismiss="dialog"]',
	};

	const className = {
		OPEN: 'open',
		BODYOPEN: 'dialog-open',
	};

	let previousFocus;
	let previousHistoryState = {};



	const toggle = dialog => {
		if(dialog.classList.contains(className.OPEN)) close(dialog);
		else open(dialog);
	};


	const open = dialog => {
		previousFocus = document.activeElement;
		document.documentElement.classList.add(className.BODYOPEN);
		dialog.classList.add(className.OPEN);
		dialog.addEventListener('transitionend', () => {
			setTimeout(() => dialog.focus(), 100);
		}, {once: true});
		dialog.addEventListener('focusout', focusout);
		dialog.addEventListener('click', clickOff);
		previousHistoryState = {dialog: dialog.id};
		window.history.pushState(previousHistoryState, '');
	};


	const close = dialog => {
		if(!dialog.classList.contains(className.OPEN)) return;

		document.documentElement.classList.remove(className.BODYOPEN);
		dialog.classList.remove(className.OPEN);
		dialog.removeEventListener('focusout', focusout);
		dialog.removeEventListener('click', clickOff);
		previousFocus.focus();
		if(window.history.state && window.history.state.dialog === dialog.id) {
			window.history.back();
			previousHistoryState = window.history.state;
		}
	};


	const focusout = function(e) {
		if(e.relatedTarget && e.relatedTarget.closest(selector.DIALOG) === this) return;

		e.preventDefault();
		e.stopPropagation();

		this.querySelector(selector.FOCUSABLE).focus();
	};


	const clickOff = function(e) {
		if(e.target === this || e.target.closest(selector.DISMISS)) {
			close(this);
		}
	};


	const keydown = e => {
		const dialog = e.target.closest(selector.DIALOG);

		if(!dialog || e.key !== 'Escape') return;

		e.preventDefault();
		e.stopPropagation();

		if(!dialog.classList.contains(className.OPEN)) return;

		close(dialog);
	};



	document.addEventListener('keydown', keydown);
	document.addEventListener('click', function(e) {
		const toggleBtn = e.target.closest(selector.TOGGLE);
		if(toggleBtn) toggle(document.querySelector(toggleBtn.dataset.target));
	});
	window.addEventListener('popstate', function() {
		if(previousHistoryState && previousHistoryState.dialog) {
			close(document.querySelector('#' + previousHistoryState.dialog));
		}
	});
}
