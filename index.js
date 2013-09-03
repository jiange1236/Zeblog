/**
 * @author Suker
 */
require([
	'statics'
], function(statics) {
	(function($) {
		$(document).ready(function(){
			document.domain = 'duopao.com';
			statics.initPageParam($);
			$('#content').show();
			$('#slider').easySlider({
				auto: true, 
				continuous: true,
				numeric: true,
				speed: 200,
				pause: 5000
			});
		});
	})(jQuery);
});
