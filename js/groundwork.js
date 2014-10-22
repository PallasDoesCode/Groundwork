/*
 *	Groundwork v0.2.5
 *	Copyright 2014 Tyler Hughes
 *	Licensed under MIT
 */

(function($)
{
	/*	========================================================================
 	 *	Groundwork: modal.js v0.3
 	 *	======================================================================== */

	$.fn.modal = function(userOptions)
	{
		var defaultOptions = 
		{
			size		: 	null, 
			url			: 	null,
			image		: 	null 
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
		if (options.url && options.image == false)
		{
			$(modalBody).load(options.url);
		}

		else if (options.url && options.image == true)
		{
			var img = $('<img>').attr(
			{
    			src: options.url, 
    			alt: options.url
			});

			$(modalBody).append(img);
		}

		else
		{
			//	If the user doesn't not provide an external link or image then take the element
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
	{
		event.preventDefault();
		
		//	Get the ID of the modal that we want to show
		var id = $(this).data('modal-id');
		showModal(id);
	});
	
	$('body').on('click', '.close', function(event)
	{
		event.preventDefault();
		
		//	Get the ID of the modal that we want to show
		var id = $(this).data('modal-id');

		closeModal(id);
	});


	/*	========================================================================
	 *	Groundwork: tooltip.js v0.2.5
	 *	======================================================================== */

	$.fn.tooltip = function(userOptions)
	{
		var defaultOptions =	{
									position: '',
									follow: true
								};

		var options = $.extend(defaultOptions, userOptions);

		var title = $(this).data('title');
		build(title, options.position, options.follow);

		$(this).mouseenter(function()
		{
			var top, left;

			var tooltip = $('#tooltip');

			if (tooltip.hasClass('top'))
			{
				top = $(this).offset().top - ($(this).height() * 2) - 10;
				left = $(this).offset().left;
			}

			else if (tooltip.hasClass('right'))
			{
				top = $(this).offset().top - ($(this).height() / 2);
				left = $(this).offset().left + tooltip.width(); 
			}
			
			else if (tooltip.hasClass('bottom'))
			{
				top = $(this).offset().top + $(this).height() + 10;
				left = $(this).offset().left;
			}

			else if (tooltip.hasClass('left'))
			{
				top = $(this).offset().top - ($(this).height() / 2);
				left = $(this).offset().left - (tooltip.width() * 1.5);
			}

			tooltip.css('top', top).css('left', left).show();

		});

		$(this).mousemove(function(e)
		{
			if (position == "" || position == undefined || follow == true)
			{
				var top = e.pageY + 25;
				var left = e.pageX + 10;

				$('#tooltip').css('top', top).css('left', left).show();
			}
		});

		$(this).mouseout(function()
		{
			$('#tooltip').hide();
		});
	}

	function build(title, position, follow)
	{
		if ($('#tooltip'))
		{
			$('#tooltip-content > p').text = title;
		}
		else
		{
			var markup  = '<div id="tooltip ' + position + '">';
			    markup += '<div id="tooltip-content">';
			    markup += '<p>' + title + '</p>';
			    markup += '<span id="tooltip-arrow"></span>';
			    markup += '</div>';
			    markup += '</div>';

			$('body').append(markup);
		}
	}

})(jQuery);