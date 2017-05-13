// Creating slices of the image
var rows = 4;
var cols = 4;
$(document).ready(function() {
	var sliceStr = createSlices(true);
	$('#puzzleContainer').html(sliceStr);
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
				sliceArr.push('<div style="background-position: ' + left + 'px ' + top +'px;" class="img" data-sequence="'+ c + '">');
			}
			else 
			{
				sliceArr.push('<div style="background-image: none;" class="img imgDroppable">');
			}
			sliceArr.push('</div>');
		}
	}
	return sliceArr.join('');
}