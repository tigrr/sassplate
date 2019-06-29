'use strict';

document.querySelector('.alert-toggle').addEventListener('click', function() {
	document.body.insertAdjacentHTML('beforeend', '<div class="alert success" role="alert">Alert: you had a great success!<button class="close close-alert" title="Close" data-dismiss="alert"></button></div>');
});
document.addEventListener('click', function(e) {
	if(e.target.classList.contains('close-alert')) {
		e.target.parentNode.remove();
	}
});