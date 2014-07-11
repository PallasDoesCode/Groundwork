/*!
 *	Groundwork v0.2
 *	Copyright 2014 Tyler Hughes
 *	Licensed under MIT
 */

 /*	========================================================================
 *	Groundwork: modal.js v0.2
 *	======================================================================== */

(function($)
{
	$.fn.modal = function(userOptions)
	{
		var defaultOptions = 
		{
			size		: 	null, 
			url			: 	null
		}

		options = $.extend({}, defaultOptions, userOptions);
		
		$(this).addClass('modal-show');
		var id = $(this).data('modal-id');
		buildModal($(this), id);
	};
	
	function buildModal(element, id)
	{
		//	Create the modal window container
		var modalWindow = document.createElement('div');
		$(modalWindow).attr('id', id).addClass('modal');
		
		//	Create the modal body where we will load the external html/image
		var modalBody = document.createElement('div');
		$(modalBody).addClass('modal-body');

		//	If the user provides an external link/image then load that image into the modal body
		if (options.url)
		{
			$(modalBody).load(options.url);	// If I use the line above then the close button will get added
											// to the modal but when I use the load method the close button is never added...for some reason the
											// load function is cancelling out anything that is getting added to the modal
		}

		else
		{
			//	If the user doesn not provide an external link or image then take the element
			//	calling this plugin and load it's contents into the modal
			$(modalBody).append(element.contents());
		}

		//	Create and add the close button
		var closeBtn = document.createElement('button');
		$(closeBtn).addClass('close');
		$(closeBtn).html('&times;');

		// Finally let's add the content to the modal itself
		$(modalWindow).append(modalBody);
		$('body').append(modalWindow);

		// Finally let's add the content to the modal itself
		$(modalWindow).append(modalBody);
		$(modalWindow).append(closeBtn);
		$('body').append(modalWindow);
	}
	
	function closeModal(id)
	{
		var modalID = '#' + id;

		//	Get the DOM that contains the modal so we can remove the backdrop
		var content = $('.modal-backdrop').contents();
		
		//	Have the backdrop and the modal fade out
		$(content).fadeOut();
		
		// Remove the backdrop from around the modal
		$('.modal-backdrop').replaceWith(content);	
	}

	function showModal(id)
	{
		var modalID = '#' + id;

		/*
		*	Add the backdrop around the modal (This is done primarily
		*	to make the developer's life easier so that they don't
		*	have to create the div for the backdrop.
		*/
		
		$(modalID).wrapAll('<div class="modal-backdrop">');

		// Have the backdrop and the modal fade in
		$('.modal-backdrop').fadeIn().find(modalID).fadeIn();
	}
	
	$('body').on('click', '.modal-show', function(event)
	
{		event.preventDefault();
		
		//	Get the ID of the modal that we want to show
		var id = $(this).data('modal-id');

		showModal(id);
	});
	
	$('body').on("click", '.close', function(event)
	{
		event.preventDefault();
		
		//	Get the ID of the modal that we want to show
		var id = $(this).data('modal-id');

		closeModal(id);
	});

})(jQuery);

/*	========================================================================
 *	Groundwork: tooltip.js v0.2
 *	======================================================================== */

(function($)
{
	$.fn.tooltip = function()
	{
		$(this).after('<div class="tooltip"></div>');
		
		$(this).mouseover(function()
		{
			title = $(this).attr('title');
			$(this).attr('title', '');
		});
		
		$(this).mousemove(function(e)
		{
			// Select the tooltip and set it's text
			var toolTip = $(this).next($('.tooltip'));
			toolTip.text(title);

			//	Since the text function replaces all content in the div we have to
			//	add the arrow afterward we set the tooltip's text
			toolTip.after('<div class="tooltip-arrow"></div>');
			var arrow = $(toolTip).find($('.tooltip-arrow'));

			var position = $(this).data('position');
			var top, left;

			if (position == 'top')
			{
				top = $(this).offset().top - ($(this).height() * 2) - 10;
				left = $(this).offset().left;

				arrow.addClass('bottom');
			}

			else if (position == 'right')
			{
				top = $(this).offset().top - ($(this).height() / 2);
				left = $(this).offset().left + toolTip.width();  

				arrow.addClass('left');
			}

			else if (position == 'left')
			{
				top = $(this).offset().top - ($(this).height() / 2);
				left = $(this).offset().left - (toolTip.width() * 1.5);

				arrow.addClass('right');
			}

			else if (position == 'bottom')
			{
				top = $(this).offset().top + $(this).height() + 10;
				left = $(this).offset().left;

				arrow.addClass('top');
			}

			else
			{
				top = e.clientY + 10;
				left = e.clientX + 15;
			}

			toolTip.css('top', top).css('left', left).show();
		});
		
		$(this).mouseout(function()
		{
			$(this).attr('title', title);
			var toolTip = $(this).next($('.tooltip'));
			var arrow = $(this).find($('.tooltip-arrow'));

			if ($(arrow).hasClass('top'))
			{
				$(arrow).removeClass('top');
			}

			if ($(arrow).hasClass('right'))
			{
				$(arrow).removeClass('right');
			}

			if ($(arrow).hasClass('bottom'))
			{
				$(arrow).removeClass('bottom');
			}

			if ($(arrow).hasClass('left'))
			{
				$(arrow).removeClass('left');
			}

			toolTip.hide();
		});

	}
	
})(jQuery);

