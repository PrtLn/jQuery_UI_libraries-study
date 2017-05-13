// Creating slices of the image
var rows = 4;
var cols = 4;

$(document).ready(function() {
	var sliceStr = createSlices(true);
	$('#puzzleContainer').html(sliceStr);

	// Starting the game
	$('#start').on('click', function()
	{
		var divs = $('#puzzleContainer > div');
		var allDivs = shuffle(divs);
		$('pieceBox').empty();
		allDivs.each(function() 
		{
			var leftDistance = Math.floor((Math.random()*280)) + 'px';
			var topDistance = Math.floor((Math.random()*280)) + 'px';

			$(this)
				.addClass('imgDraggable')
				.css({
					position : 'absolute',
					left : leftDistance,
					top : topDistance
				});
			$('#pieceBox').append($(this));
		});

		var sliceStr = createSlices(false);
		$('#puzzleContainer').html(sliceStr);

		$(this).hide();
		$('#reset').show();

		addPuzzleEvents();
	});
});
	
function createSlices(useImage)
{
	var str = '';
	var sliceArr = [];
	for(var i=0, top=0, c=0; i < rows; i++, top-=100)
	{
		for(var j=0, left=0; j < cols; j++, left-= 100, c++)
		{
			if(useImage)
			{
				str+= '<div style="background-position: ' + left + 'px ' + top +'px;" class="img" data-sequence="'+ c + '">';
			}
			else 
			{
				str+='<div style="background-image: none;" class="img imgDroppable">';
			}
			str+= '</div>';
		}
	}
	return str;
}

function shuffle(o) 
{
	for (var j, x, i = o.length; i; 
			j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

// Handling events for puzzle pieces
function addPuzzleEvents() 
{
	$('.imgDraggable').draggable(
	{
		revert : 'invalid',
			start : function(event, ui) {
				var $this = $(this);
				if($this.hasClass('pieceDropped'))
			{
				$this.removeClass('pieceDropped');
				($this.parent()).removeClass('piecePresent');
			}
		}
	});

	$('.imgDroppable').droppable({
		hoverClass : "ui-state-highlight",
		accept : function(draggable)
		{
			return !$(this).hasClass('piecePresent');
		},

		drop : function(event, ui) {
			var draggable = ui.draggable;
			var droppedOn = $(this);
			droppedOn.addClass('piecePresent');
			$(draggable).detach().addClass('pieceDropped').css({
				top: 0,
				left: 0, 
				position:'relative'
			}).appendTo(droppedOn);
			
			checkIfPuzzleComplete();
		}
	});
}

// Checking for puzzle completion
function checkIfPuzzleComplete()
{
	if($('#puzzleContainer div.pieceDropped').length != 16)
	{
		return false;
	}
	for(var i = 0; i < 16; i++)
	{
		var puzzlePiece = $('#puzzleContainer div.pieceDropped:eq('+i+')');
		var sequence = parseInt(puzzlePiece.data('sequence'), 10);
		if(i != sequence)
		{
			$('#message').text('Nope! You made sun boy sad :(').show();
			return false;
		}
	}
	$('#message').text('YaY! sun boy is happy now :)').show();
	return true;
}
