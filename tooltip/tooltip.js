(function($)
{
	$.fn.tooltip = function()
	{
		$(this).after('<div id="tooltip"></div>');
		
		$(this).mouseover(function()
		{
			title = $(this).attr('title');
			$(this).attr('title', '');
			
		});
		
		$(this).mousemove(function(e)
		{
			var top = e.clientY + 10;
			var left = e.clientX + 15;
			
			$('#tooltip').css('top', top).css('left', left).text(title).show();
		});
		
		$(this).mouseout(function()
		{
			$(this).attr('title', title);
			$('#tooltip').hide();
		});
	}
	
})(jQuery);