$(function(){
	// header footer call
	$.when(
		$.ajax({url: '/st/3/en/pc/include/header_standard.html'}),
		$.ajax({url: '/st/3/en/pc/include/footer_standard.html'})
	)
	.done(function(header_html, footer_html) {
		$("#header-footer-standard").before(header_html[0]).after(footer_html[0]);
	})
	.fail(function() {
		console.log('error');
	});
});