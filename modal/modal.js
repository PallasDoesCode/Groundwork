(function()
{
	$('.modalClick').on('click', function(event)
	{
		event.preventDefault();
		$('.modal-overlay').fadeIn().find('.modal').fadeIn();
	});
	
	$('.close').on('click', function(event)
	{
		event.preventDefault();
		$('.modal-overlay').fadeOut().find('.modal').fadeOut();
	});
})(jQuery);